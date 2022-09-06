// Third Party
import { Request, Response } from "express";

// Local
import ResponseModel from "@domain/models/response/response-model";

interface IPostController {
  getAllPosts(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  getPostById(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  createPost(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  editPost(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  deletePost(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;
}

export default IPostController;
