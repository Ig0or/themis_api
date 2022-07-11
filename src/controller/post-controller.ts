import { Response, Request } from "express";
import { MongoInfrastructure } from "../infrastructure/mongo-infra";

const mongoInfrastructure = new MongoInfrastructure();
const mongoConnection = mongoInfrastructure.getConnection("studies", "blog");

class PostController {
    static async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response> {
        const test = await mongoConnection.find().toArray();

        return response.send("hello world");
    }
}

export { PostController };
