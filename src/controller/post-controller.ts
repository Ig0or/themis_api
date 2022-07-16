import { Response, Request } from "express";
import { MongoRepository } from "../repositories/mongodb";
import { MongoInfrastructure } from "../infrastructure/mongodb";
import { PostService } from "../services";
import { Post } from "../domain/models";

const mongoInfrastructure = new MongoInfrastructure(process.env.MONGO_DB_URI!);
const mongoConnection = mongoInfrastructure.getConnection("studies", "blog");
const mongoRepository = new MongoRepository(mongoConnection);
const postService = new PostService(mongoRepository);

class PostController {
    static async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response<Array<Post>>> {
        const posts = await postService.getAllPosts();

        return response.json(posts);
    }

    static async getPostById(request: Request, response: Response) {
        const postId = request.params.id;
        const post = await postService.getPostById(postId);

        return response.json(post);
    }
}

export { PostController };
