// Third Party
import { Request, Response } from "express";

// Local
import IPostService from "@core/services/post/i-post-service";
import ResponseModel from "@domain/models/response/response-model";
import dependenciesContainer from "@infrastructure/DI/modules";
import PostService from "@services/post/post-service";
import IPostController from "@core/controllers/post/i-post-controller";

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

  async editPost(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>> {
    const bodyParams = request.body;
    const postId = request.params.id;
    const responseModel = await this._postService.editPost(bodyParams, postId);

    return response.status(responseModel.statusCode).json(responseModel);
  }

  async deletePost(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>> {
    const postId = request.params.id;
    const responseModel = await this._postService.deletePost(postId);

    return response.status(responseModel.statusCode).json(responseModel);
  }
}

export default PostController;
