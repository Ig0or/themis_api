// Third Party
import { Request, Response } from "express";

// Local
import { IPostController } from "../../core/controllers";
import { IPostService } from "../../core/services";
import { ResponseModel } from "../../domain/models";
import { dependenciesContainer } from "../../infrastructure";
import { PostService } from "../../services";

class PostController implements IPostController {
    private _postService: IPostService;
    constructor(
        postService: IPostService = dependenciesContainer.services.postService.injectClass(
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

    async getPostById(
        request: Request,
        response: Response
    ): Promise<Response<ResponseModel>> {
        const postId = request.params.id;
        const responseModel = await this._postService.getPostById(postId);

        return response.status(responseModel.statusCode).json(responseModel);
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
