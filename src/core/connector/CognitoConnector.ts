import EnvManager from "../../config/EnvManager";
import Connector from "./Connector";
import qs from "qs";

class CognitoConnector extends Connector {
  private baseUrl: string;

  constructor() {
    super();
    this.baseUrl = EnvManager.getCognitoDomain();
    this.client.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
  }

  getTokens(code: string) {
    const data = {
      grant_type: "authorization_code",
      redirect_uri: EnvManager.getCognitoCallbackUrl(),
      client_id: EnvManager.getCognitoClientId(),
      client_secret: EnvManager.getCognitoClientSecret(),
      code: code,
    };

    return this.client.post(`${this.baseUrl}/oauth2/token`, qs.stringify(data));
  }

  getProfileData(accessToken: string) {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return this.client.get(`${this.baseUrl}/oauth2/userInfo`, options);
  }

  updateTokens(refreshToken: string) {
    const data = {
      grant_type: "refresh_token",
      client_id: EnvManager.getCognitoClientId(),
      client_secret: EnvManager.getCognitoClientSecret(),
      refresh_token: refreshToken,
    };

    return this.client.post(`${this.baseUrl}/oauth2/token`, qs.stringify(data));
  }
}

export default CognitoConnector;
