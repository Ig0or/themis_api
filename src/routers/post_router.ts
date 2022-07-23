import { Router } from "express";

import { PostController } from "../controller";
import { dependenciesContainer } from "../infrastructure/DI";

const postRouter = Router();

const postController =
    dependenciesContainer.controllers.postController.injectClass(
        PostController
    );

postRouter.get("/", postController.getAllPosts.bind(postController));
postRouter.get("/:id?", postController.getPostById.bind(postController));

export { postRouter };
