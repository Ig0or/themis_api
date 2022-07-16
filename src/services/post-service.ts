import { IPostService } from "../core/services";
import { MongoRepository } from "../repositories/mongodb";
import { Post } from "../domain/models/";

class PostService implements IPostService {
    mongoRepository: MongoRepository;
    constructor(mongoRepository: MongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    async getAllPosts(): Promise<Array<Post>> {
        const posts = await this.mongoRepository.getAllPosts();

        return posts;
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.mongoRepository.getPostById(postId);

        return post;
    }
}

export { PostService };
