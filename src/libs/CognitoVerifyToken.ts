import jwkToPem from "jwk-to-pem";
import jwt, { Jwt } from "jsonwebtoken";
import Axios from "axios";
import EnvManager from "../config/EnvManager";

const pems: { [key: string]: any } = {};

export interface DecodePayload {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

export interface DecodedJwt {
  header: {
    kid: string;
    alg: string;
  };
  payload: DecodePayload;
}

export interface ClaimVerifyResult {
  readonly userName: string;
  readonly userId: string;
  readonly isValid: boolean;
  readonly error?: any;
  readonly payload: DecodePayload | null;
}

class CognitoVerifyToken {
  private static poolRegion: string = EnvManager.getCognitoRegion();
  private static userPoolId: string = EnvManager.getCognitoPoolId();

  private static cognitoIssuer = `https://cognito-idp.${this.poolRegion}.amazonaws.com/${this.userPoolId}`;
  private static url = `${this.cognitoIssuer}/.well-known/jwks.json`;

  public static async verifyToken(token: string): Promise<ClaimVerifyResult> {
    let result: ClaimVerifyResult;

    try {
      if (!token) throw new Error("requested token is empty");

      const decodedJwt: any = jwt.decode(token, { complete: true });
      if (decodedJwt === null) {
        throw new Error("requested token is invalid");
      }

      await this.getPublicKeys();

      const kid = decodedJwt.header.kid;
      const pem = pems[kid];

      if (!pem) {
        throw new Error("Requested pem invalid.");
      }

      const currentSeconds = Math.floor(new Date().getTime() / 1000);

      if (
        currentSeconds > decodedJwt.payload.exp ||
        currentSeconds < decodedJwt.auth_time
      ) {
        throw new Error("JWT is expired or invalid.");
      }

      if (decodedJwt.payload.iss !== this.cognitoIssuer) {
        throw new Error("Claim issuer is invalid.");
      }

      if (decodedJwt.payload.token_use !== "access") {
        throw new Error("Claim use is not access.");
      }

      const payload = jwt.verify(token, pem) as DecodePayload;

      result = {
        payload,
        userName: payload.username,
        userId: payload.sub,
        isValid: true,
      };
    } catch (error: any) {
      result = {
        payload: null,
        userName: "",
        userId: "",
        error,
        isValid: false,
      };
    }

    return result;
  }

  private static async getPublicKeys() {
    if (!this.userPoolId || !this.poolRegion) {
      throw new Error("Env var required for cognito pool and cognito region.");
    }

    try {
      const response = await Axios.get(this.url);
      if (response.status !== 200) {
        throw "Request not successful.";
      }
      const { data } = response;
      const { keys } = data;
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;
        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
    } catch (error) {
      throw "Error! Unable to download JWKs.";
    }
  }
}

export default CognitoVerifyToken;
