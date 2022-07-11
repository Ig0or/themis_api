import { Response, Request } from "express";
import { MongoRepository } from "../repositories/mongo-repository";

const b = new MongoRepository();

class PostController {
    static async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response> {
        return response.send("hello world");
    }
}

export { PostController };
