class Config {
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
}

export default Config;
