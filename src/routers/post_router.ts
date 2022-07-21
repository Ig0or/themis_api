import { Router } from "express";

import { PostController } from "../controller";
import { dependenciesContainer } from "../infrastructure/DI";

const postRouter = Router();

const postController =
    dependenciesContainer.controllers.postController.injectClass(
        PostController
    );

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id?", postController.getPostById);

export { postRouter };
