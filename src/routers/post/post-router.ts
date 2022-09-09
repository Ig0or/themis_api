// Third Party
import { Router } from "express";

// Local
import PostController from "@controllers/post/post-controller";
import PostValidator from "@domain/validators/post/post-validator";
import dependenciesContainer from "@infrastructure/DI/modules";
import validatorMiddleware from "@middlewares/validator/validator-middleware";

const postController =
  dependenciesContainer.controllers.postController.injectClass(PostController);

const postRouter = Router();

postRouter.get("/", postController.getAllPosts.bind(postController));
postRouter.get("/:id?", postController.getPostById.bind(postController));
postRouter.post(
  "/",
  PostValidator.createPostSchema,
  validatorMiddleware,
  postController.createPost.bind(postController)
);
postRouter.put(
  "/:id",
  PostValidator.editPostSchema,
  validatorMiddleware,
  postController.editPost.bind(postController)
);
postRouter.delete("/:id", postController.deletePost.bind(postController));

export default postRouter;
