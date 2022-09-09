// Third Party
import { Router } from "express";

// Local
import UserController from "@controllers/user/user-controller";
import UserValidator from "@domain/validators/user/user-validator";
import dependenciesContainer from "@infrastructure/DI/modules";
import validatorMiddleware from "@middlewares/validator/validator-middleware";

const userController =
  dependenciesContainer.controllers.userController.injectClass(UserController);

const userRouter = Router();

userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:id?", userController.getUserById.bind(userController));
userRouter.post(
  "/",
  UserValidator.createUserSchema,
  validatorMiddleware,
  userController.createUser.bind(userController)
);

export default userRouter;
