// Third Party
import { Router } from "express";

// Local
import { UserController } from "@controllers/index";
import { dependenciesContainer } from "@infrastructure/DI";

const userRouter = Router();

const userController =
    dependenciesContainer.controllers.userController.injectClass(
        UserController
    );

userRouter.get("/", userController.getAllUSers.bind(userController));
userRouter.get("/:id?", userController.getUserById.bind(userController));

export { userRouter };
