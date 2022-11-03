export interface IAttributeType {
  Name: string;
  Value?: string;
}

export interface IUserAttributes {
  Username: string;
  UserAttributes: IAttributeType[];
}

export interface IUserResponse {
  token: string | null | undefined;
  id: string | null;
  user: Record<string, string | undefined> | null;
  error?: string;
}

export interface IUserAttributesResponse {
  sub: string;
  email?: string;
  name?: string;
  family_name?: string;
  phone_number?: string;
  email_verified?: string;
  phone_number_verified?: string;
}
