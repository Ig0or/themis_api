// Third Party
import { Request, Response } from "express";

// Local
import ResponseModel from "@domain/models/response/response-model";
import UserModel from "@domain/models/user/user-model";

interface IUserController {
  getAllUsers(
    request: Request,
    response: Response
  ): Promise<Response<Array<UserModel>>>;

  getUserById(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  createUser(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  deleteUser(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;

  editUser(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>>;
}

export default IUserController;
