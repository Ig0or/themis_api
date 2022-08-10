import { checkSchema } from "express-validator";

const postValidator = checkSchema({
    title: {
        isString: true,
        errorMessage: "This field is required as string.",
    },
    body: {
        isString: true,
        errorMessage: "This field is required as string.",
    },
    userId: {
        isString: true,
        errorMessage: "This field is required as string.",
    },
});

export { postValidator };
