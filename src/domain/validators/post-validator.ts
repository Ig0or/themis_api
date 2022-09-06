// Third Party
import { checkSchema } from "express-validator";

class PostValidator {
  static createPostSchema = checkSchema({
    title: {
      isString: true,
      errorMessage: "Invalid params.",
    },
    body: {
      isString: true,
      errorMessage: "Invalid params.",
    },
    userId: {
      isString: true,
      errorMessage: "Invalid params.",
    },
  });

  static editPostSchema = checkSchema({
    title: {
      isString: true,
      errorMessage: "Invalid params.",
    },
    body: {
      isString: true,
      errorMessage: "Invalid params.",
    },
  });
}

export default PostValidator;
