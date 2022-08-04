import { Post } from "../../domain/models";
import { MongoRepository } from "../../repositories/mongodb/mongodb_repository";

interface IPostService {
    _mongoRepository: MongoRepository;
    getAllPosts(): Promise<Array<Post>>;
    getPostById(postId: string): Promise<Post>;
    createPost(title: string, body: string, userId: string): Promise<string>;
}

export { IPostService };
