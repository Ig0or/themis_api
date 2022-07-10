import { Router } from "express";

import { PostController } from "../controller/post-controller";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);

export { postRouter };
