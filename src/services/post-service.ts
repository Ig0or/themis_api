import { IPostService } from "../core/services";
import { MongoRepository } from "../repositories/mongodb";
import { Post } from "../domain/models/";
import { dependenciesContainer } from "../infrastructure/DI";

class PostService {
    private _mongoRepository: MongoRepository;
    constructor(
        mongoRepository: MongoRepository = dependenciesContainer.repositories.mongoRepository.injectClass(
            MongoRepository
        )
    ) {
        this._mongoRepository = mongoRepository;
    }

    async getAllPosts(): Promise<Array<Post>> {
        const posts = await this._mongoRepository.getAllPosts();

        return posts;
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this._mongoRepository.getPostById(postId);

        return post;
    }
}

export { PostService };
