// Third Party
import { Request, Response } from "express";

// Local
import { ResponseModel } from "../domain/models";
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
    ): Promise<Response<ResponseModel>> {
        const responseModel = await this._postService.getAllPosts();

        return response.status(responseModel.statusCode).json(responseModel);
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
    ): Promise<Response<ResponseModel>> {
        const bodyParams = request.body;
        const responseModel = await this._postService.createPost(bodyParams);

        return response.status(responseModel.statusCode).json(responseModel);
    }
}

export { PostController };
