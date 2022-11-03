import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import { ClientConfiguration } from "aws-sdk/clients/cognitoidentity";
import {
  AttributeListType,
  ConfirmForgotPasswordRequest,
  ConfirmSignUpRequest,
  ForgotPasswordRequest,
  GetUserRequest,
  GetUserResponse,
  InitiateAuthRequest,
  ListUsersRequest,
  ListUsersResponse,
  SignUpRequest,
  SignUpResponse,
} from "aws-sdk/clients/cognitoidentityserviceprovider";
import crypto from "crypto";
import Config from "../config/Config";

class Cognito {
  clientId: string;
  clientSecret: string;
  poolId: string;
  cognitoIdentity: CognitoIdentityServiceProvider;

  constructor() {
    this.clientId = Config.getCognitoClientId();
    this.clientSecret = Config.getCognitoClientSecret();
    this.poolId = Config.getCognitoPoolId();

    const cognitoParams: ClientConfiguration = {
      apiVersion: Config.getCognitoApiVersion(),
      region: Config.getCognitoRegion(),
    };

    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(
      cognitoParams
    );
  }

  async signUpUser(
    username: string,
    password: string,
    userAttr: AttributeListType
  ): Promise<SignUpResponse | boolean> {
    var params: SignUpRequest = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
      UserAttributes: userAttr,
    };

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return true;
    } catch (error: any) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async signInUser(username: string, password: string): Promise<string> {
    const params: InitiateAuthRequest = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      return data.AuthenticationResult?.AccessToken || "";
    } catch (error: any) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async confirmSignUp(username: string, code: string): Promise<boolean> {
    const params: ConfirmSignUpRequest = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp(params)
        .promise();
      console.log(cognitoResp);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  async forgotPassword(username: string): Promise<boolean> {
    const params: ForgotPasswordRequest = {
      ClientId: this.clientId /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  async confirmNewPassword(
    username: string,
    password: string,
    code: string
  ): Promise<boolean> {
    const params: ConfirmForgotPasswordRequest = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log(data);
      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  async getUser(accessToken: string): Promise<GetUserResponse> {
    const params: GetUserRequest = {
      AccessToken: accessToken,
    };

    try {
      const data = await this.cognitoIdentity.getUser(params).promise();
      return data;
    } catch (error: any) {
      console.log(error);
      throw Error(error.message);
    }
  }

  async listUsers(
    findBy: string,
    keyword: string,
    limit?: number,
    paginationToken?: string
  ): Promise<ListUsersResponse> {
    const params: ListUsersRequest = {
      AttributesToGet: ["sub", "name", "family_name", "email", "phone_number"],
      Filter: `${findBy} = "${keyword}"`,
      Limit: limit || 1,
      UserPoolId: this.poolId,
      PaginationToken: paginationToken,
    };

    try {
      const data = await this.cognitoIdentity.listUsers(params).promise();
      return data;
    } catch (error: any) {
      console.log(error);
      throw Error(error.message);
    }
  }

  hashSecret(username: string): string {
    return crypto
      .createHmac("SHA256", this.clientSecret)
      .update(username + this.clientId)
      .digest("base64");
  }
}

export default Cognito;
