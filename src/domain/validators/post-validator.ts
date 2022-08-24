// Third Party
import { checkSchema } from "express-validator";

const createPostValidator = checkSchema({
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

const editPostValidator = checkSchema({
    title: {
        isString: true,
        errorMessage: "Invalid params.",
    },
    body: {
        isString: true,
        errorMessage: "Invalid params.",
    },
});

export { createPostValidator, editPostValidator };
