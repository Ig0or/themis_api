import { PostModel } from "../domain/models";
import { PostInput } from "../domain/types";
import { dependenciesContainer } from "../infrastructure";
import { MongoRepository } from "../repositories/mongodb";

import { ResponseModel } from "../domain/models/";

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

    async createPost(post: PostInput): Promise<ResponseModel> {
        const userId = post.userId;
        const user = await this._mongoRepository.getUserById(userId);

        if (!user) {
            const responseModel: ResponseModel = {
                statusCode: 404,
                success: false,
                message:
                    "The post wasn't created because this user doesn't exist.",
            };

            return responseModel;
        }

        const postId = uuidv4();
        const createdAt = Date.now();
        const postObject: PostModel = {
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
