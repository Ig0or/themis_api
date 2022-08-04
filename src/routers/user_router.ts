import { Router } from "express";

import { dependenciesContainer } from "../infrastructure/DI";
import { UserController } from "../controller";

const userRouter = Router();

const userController =
    dependenciesContainer.controllers.userController.injectClass(
        UserController
    );

userRouter.get("/", userController.getAllUSers.bind(userController));

export { userRouter };
