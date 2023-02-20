class EnvManager {
  static getCognitoClientId(): string {
    return process.env.COGNITO_CLIENT_ID || "";
  }

  static getCognitoClientSecret(): string {
    return process.env.COGNITO_CLIENT_SECRET || "";
  }

  static getCognitoRegion(): string {
    return process.env.COGNITO_REGION || "";
  }

  static getCognitoPoolId(): string {
    return process.env.COGNITO_POOL_ID || "";
  }

  static getCognitoApiVersion(): string {
    return process.env.API_VERSION || "";
  }

  static getCognitoCallbackUrl(): string {
    return process.env.COGNITO_CALLBACK_URL || "";
  }

  static getCognitoDomain(): string {
    return process.env.COGNITO_DOMAIN || "";
  }

  static getCognitoLoginUrl = (state: string, scopes: string[] = []) => {
    const defaultScopes = ["openid", "profile"];
    const userScopes = [...defaultScopes, ...scopes];

    const queryParams = {
      response_type: "code",
      client_id: this.getCognitoClientId(),
      redirect_uri: this.getCognitoCallbackUrl(),
      scope: userScopes.join("+"),
      state: state || "123456",
    };

    let loginUrl = `${this.getCognitoDomain()}/login`;

    let query = "?";
    for (const [key, value] of Object.entries(queryParams)) {
      query += `${key}=${value}&`;
    }

    loginUrl += query.slice(0, -1);
    return loginUrl;
  };
}

export default EnvManager;
