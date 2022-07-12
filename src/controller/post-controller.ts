import { Response, Request } from "express";
import { MongoRepository } from "../repositories/mongodb/mongodb-repository";

const a = new MongoRepository();

class PostController {
    static async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response> {
        const b = await a.getPostById("16375272-c15b-4cec-92e4-7ccb138e7f6d");
        return response.send("hello world");
    }
}

export { PostController };
