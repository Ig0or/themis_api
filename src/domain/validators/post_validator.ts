import { checkSchema } from "express-validator";

const postValidator = checkSchema({
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

export { postValidator };
