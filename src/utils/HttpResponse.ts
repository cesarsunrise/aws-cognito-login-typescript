import { APIGatewayProxyResult } from "aws-lambda";

class HttpResponse {
  private static headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "*",
  };

  public static OK(data: any, statusCode = 200): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      headers: this.headers,
      body: JSON.stringify(data || {}),
    };
  }

  public static ERROR(data: any, statusCode = 500): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      headers: this.headers,
      body: JSON.stringify(data),
    };
  }
}

export default HttpResponse;
