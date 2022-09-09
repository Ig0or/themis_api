// Third Party
import { Request, Response } from "express";

// Local
import IUserController from "@core/controllers/user/i-user-controller";
import ResponseModel from "@domain/models/response/response-model";
import UserModel from "@domain/models/user/user-model";
import dependenciesContainer from "@infrastructure/DI/modules";
import UserService from "@services/user/user-service";

class UserController implements IUserController {
  private _userService: UserService;

  constructor(
    userService: UserService = dependenciesContainer.services.postService.injectClass(
      UserService
    )
  ) {
    this._userService = userService;
  }

  async getAllUsers(
    request: Request,
    response: Response
  ): Promise<Response<Array<UserModel>>> {
    const responseModel = await this._userService.getAllUsers();

    return response.status(responseModel.statusCode).json(responseModel);
  }

  async getUserById(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>> {
    const userId = request.params.id;
    const responseModel = await this._userService.getUserById(userId);

    return response.status(responseModel.statusCode).json(responseModel);
  }

  async createUser(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>> {
    const bodyParams = request.body;
    const responseModel = await this._userService.createUser(bodyParams);

    return response.status(responseModel.statusCode).json(responseModel);
  }

  async deleteUser(
    request: Request,
    response: Response
  ): Promise<Response<ResponseModel>> {
    const userId = request.params.id;
    const responseModel = await this._userService.deleteUser(userId);

    return response.status(responseModel.statusCode).json(responseModel);
  }
}

export default UserController;
