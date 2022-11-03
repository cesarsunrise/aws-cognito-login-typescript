import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Cognito from "./libs/CognitoService";
import HttpResponse from "./utils/HttpResponse";
import signinValidator from "./utils/signinValidator";
import {
  userErrorResponse,
  userResponseAttributes,
  validateEmailOrPhone,
} from "./utils/userTransform";

export const run = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const postbody = JSON.parse(event.body as string);
    signinValidator(postbody);

    console.log("POST BODY", postbody);

    const cognitoService = new Cognito();

    const { email, password } = postbody;
    const username = validateEmailOrPhone(email);

    console.log("SIGNIN****", username);

    // To obtain the user data, it is necessary to log in and obtain the accessToken
    const signInResponse = await cognitoService.signInUser(username, password);
    const userResponse = await cognitoService.getUser(signInResponse);
    console.log(HttpResponse.OK(userResponseAttributes(userResponse)));
    return HttpResponse.OK(userResponseAttributes(userResponse));
  } catch (error: any) {
    console.log(HttpResponse.OK(userErrorResponse(error.message)));
    return HttpResponse.OK(userErrorResponse(error.message));
  }
};
