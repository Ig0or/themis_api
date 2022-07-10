import { Response, Request } from "express";

class PostController {
    static getAllPosts(request: Request, response: Response): Response {
        return response.send("hello world");
    }
}

export { PostController };
