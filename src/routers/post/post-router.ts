// Third Party
import { Router } from "express";

// Local
import PostController from "@controllers/post/post-controller";
import PostValidator from "@domain/validators/post-validator";
import dependenciesContainer from "@infrastructure/DI/modules";
import postValidatorMiddleware from "@middlewares/post/post-middleware";

const postRouter = Router();

const postController =
  dependenciesContainer.controllers.postController.injectClass(PostController);

postRouter.get("/", postController.getAllPosts.bind(postController));
postRouter.get("/:id?", postController.getPostById.bind(postController));
postRouter.post(
  "/",
  PostValidator.createPostSchema,
  postValidatorMiddleware,
  postController.createPost.bind(postController)
);
postRouter.put(
  "/:id",
  PostValidator.editPostSchema,
  postValidatorMiddleware,
  postController.editPost.bind(postController)
);
postRouter.delete("/:id", postController.deletePost.bind(postController));

export { postRouter };
