// Third Party
import { Router } from "express";

// Local
import UserController from "@controllers/user/user-controller";
import dependenciesContainer from "@infrastructure/DI/modules";

const userController =
  dependenciesContainer.controllers.userController.injectClass(UserController);

const userRouter = Router();

userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:id?", userController.getUserById.bind(userController));

export default userRouter;
