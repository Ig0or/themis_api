import { Router } from "express";

import { PostController } from "../controller";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);

export { postRouter };
