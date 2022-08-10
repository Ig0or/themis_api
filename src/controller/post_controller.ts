import { Request, Response } from "express";

import { PostModel } from "../domain/models";
import { dependenciesContainer } from "../infrastructure";
import { PostService } from "../services";

class PostController {
    private _postService: PostService;
    constructor(
        postService: PostService = dependenciesContainer.services.postService.injectClass(
            PostService
        )
    ) {
        this._postService = postService;
    }

    async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response<Array<Post>>> {
        const posts = await this._postService.getAllPosts();

        return response.json(posts);
    }

    async getPostById(request: Request, response: Response): Promise<Response> {
        const postId = request.params.id;
        const post = await this._postService.getPostById(postId);

        if (!post) {
            const responseMessage = "This post doesn't exist.";

            return response.status(404).json(responseMessage);
        }

        return response.json(post);
    }

    async createPost(
        request: Request,
        response: Response
    ): Promise<Response<string>> {
        const bodyParams = request.body;
        const responseService = await this._postService.createPost(bodyParams);

        return response.status(201).json(responseService);
    }
}

export { PostController };
