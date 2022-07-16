import { Post } from "../../domain/models/post_types";
import { MongoRepository } from "../../repositories/mongodb/mongodb-repository";

interface IPostService {
    mongoRepository: MongoRepository;
    getAllPosts(): Promise<Array<Post>>;
    getPostById(postId: string): Promise<Post>;
    // createPost(title: string, body: string, userId: string): string;
}

export { IPostService };
