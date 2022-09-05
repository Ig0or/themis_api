// Third Party
import { Router } from "express";

// Local
import { PostController } from "@controllers/index";
import { createPostValidator, editPostValidator } from "@domain/validators";
import { dependenciesContainer } from "@infrastructure/DI";
import { postValidatorMiddleware } from "@middlewares/index";

const postRouter = Router();

const postController =
  dependenciesContainer.controllers.postController.injectClass(PostController);

postRouter.get("/", postController.getAllPosts.bind(postController));
postRouter.get("/:id?", postController.getPostById.bind(postController));
postRouter.post(
  "/",
  createPostValidator,
  postValidatorMiddleware,
  postController.createPost.bind(postController)
);
postRouter.put(
  "/:id?",
  editPostValidator,
  postValidatorMiddleware,
  postController.editPost.bind(postController)
);

export { postRouter };
