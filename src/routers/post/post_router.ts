import { Router } from "express";

import { PostController } from "../../controller";
import { postValidator } from "../../domain/validators";
import { dependenciesContainer } from "../../infrastructure/DI";
import { postMiddleware } from "../../middlewares/";

const postRouter = Router();

const postController =
    dependenciesContainer.controllers.postController.injectClass(
        PostController
    );

postRouter.get("/", postController.getAllPosts.bind(postController));
postRouter.get("/:id?", postController.getPostById.bind(postController));
postRouter.post(
    "/",
    postValidator,
    postMiddleware,
    postController.createPost.bind(postController)
);

export { postRouter };
