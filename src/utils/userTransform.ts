import { IUserAttributes, IUserResponse } from "../dto/UserData";

export const userResponseAttributes = (
  body: IUserAttributes
): IUserResponse => {
  const userData: Record<string, string | undefined> = {};
  body.UserAttributes.forEach((attribute) => {
    userData[attribute.Name] = attribute.Value;
  });

  const response: IUserResponse = {
    token: body.Username,
    id: body.Username,
    user: userData,
  };

  response.token = response.user?.sub;
  return response;
};

export const validateEmailOrPhone = (username: string): string => {
  const phonePattern = /(\d{10})/;
  const isPhone = phonePattern.test(username);
  if (isPhone) {
    return `+1${username}`;
  }
  return username;
};

export const userErrorResponse = (message: string): IUserResponse => {
  const errorData: IUserResponse = {
    token: null,
    id: null,
    user: null,
    error: message,
  };

  return errorData;
};

module.exports = {
  userResponseAttributes,
  validateEmailOrPhone,
  userErrorResponse,
};
