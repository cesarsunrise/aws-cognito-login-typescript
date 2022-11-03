import Joi from "joi";
import { ISignIn } from "../dto/SigninData";

const schemaSignin = Joi.object({
  email: Joi.string().min(4).max(200).required(),
  password: Joi.string().min(8).max(300).required(),
});

const signinValidator = (body: ISignIn): boolean => {
  const { error } = schemaSignin.validate(body);
  if (error) {
    throw Error(error.details[0]?.message);
  }
  return true;
};

export default signinValidator;
