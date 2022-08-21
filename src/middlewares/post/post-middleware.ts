// Third Party
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const postMiddleware = function (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const errorMessage = { errors: errors.array() };
        return response.status(400).json(errorMessage);
    }

    next();
};

export { postMiddleware };
