// Third Party
import { checkSchema } from "express-validator";

class UserValidator {
  static userSchema = checkSchema({
    userName: {
      isString: true,
      errorMessage: "Invalid params",
    },
  });
}

export default UserValidator;
