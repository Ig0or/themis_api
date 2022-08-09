import { Post } from "../domain/models";
import { dependenciesContainer } from "../infrastructure";
import { MongoRepository } from "../repositories/mongodb";

import { v4 as uuidv4 } from "uuid";

class PostService {
    _mongoRepository: MongoRepository;
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

    async createPost(post: Post): Promise<string> {
        const userId = post.userId;
        const user = await this._mongoRepository.getUserById(userId);

        if (!user) {
            return "This userId doesn't exist.";
        }

        const postId = uuidv4();
        const createdAt = Date.now();
        const postObject: Post = {
            title: post.title,
            body: post.body,
            userId: post.userId,
            postId: postId,
            createdAt: createdAt,
        };

        await this._mongoRepository.createPost(postObject);

        return "Post created";
    }
}

export { PostService };
