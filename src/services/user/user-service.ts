// Third Party
import { v4 as uuidv4 } from "uuid";
import { camelizeKeys, decamelizeKeys } from "humps";

// Local
import IPostRepository from "@core/repositories/post/i-post-repository";
import IUserRepository from "@core/repositories/user/i-user-repository";
import IUserService from "@core/services/user/i-user-service";
import editUserResponseModelMap from "@domain/maps/user/edit-user-response-map";
import removeUserResponseModelMap from "@domain/maps/user/remove-user-response-map";
import ResponseModel from "@domain/models/response/response-model";
import UserModel from "@domain/models/user/user-model";
import UserInput from "@domain/types/user/user-input";
import dependenciesContainer from "@infrastructure/DI/modules";
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";

class UserService implements IUserService {
  private _userRepository: IUserRepository;
  private _postRepository: IPostRepository;

  constructor(
    userRepository: IUserRepository = dependenciesContainer.repositories.userRepository.injectClass(
      UserRepository
    ),
    postRepository: IPostRepository = dependenciesContainer.repositories.postRepository.injectClass(
      PostRepository
    )
  ) {
    this._userRepository = userRepository;
    this._postRepository = postRepository;
  }

  async getAllUsers(): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
    };

    try {
      const users = await this._userRepository.getAllUsers();
      const camelizedUsers: any = camelizeKeys(users);
      const usersModel = camelizedUsers.map((user) =>
        new UserModel().toModel(user)
      );

      responseModel.result = usersModel;
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async getUserById(userId: string): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
    };

    try {
      const user = await this._userRepository.getUserById(userId);

      let userModel;
      if (user) {
        const userPosts = await this._postRepository.getPostsByUserId(userId);

        const camelizedUser: any = camelizeKeys(user);
        const camelizedUserPosts: any = camelizeKeys(userPosts);

        userModel = new UserModel().toModel(camelizedUser, camelizedUserPosts);
      }

      responseModel.result = userModel || {};
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async createUser(user: UserInput): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      const userId = uuidv4();
      const createdAt = Date.now();

      const userObject = {
        userId: userId,
        createdAt: createdAt,
        userName: user.userName,
      };

      const userModel = new UserModel().toModel(userObject);
      const decamelizeUserModel: any = decamelizeKeys(userModel);

      await this._userRepository.createUser(decamelizeUserModel);

      responseModel.result = "User created";
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async deleteUser(userId: string): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      await this._postRepository.deletePostsByUserId(userId);
      const wasUserDeleted = await this._userRepository.deleteUser(userId);
      responseModel = removeUserResponseModelMap.get(
        wasUserDeleted.deletedCount
      );
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async editUser(
    userChanges: UserInput,
    userId: string
  ): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      const wasUserUpdated = await this._userRepository.editUser(
        userChanges,
        userId
      );

      responseModel = this._editUserGetResponseModel(
        wasUserUpdated.modifiedCount,
        wasUserUpdated.matchedCount
      );
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  private _editUserGetResponseModel(
    modifiedCount: Number,
    matchedCount: Number
  ): ResponseModel {
    const responseModelKey = `${modifiedCount}, ${matchedCount}`;
    const responseModelResult = editUserResponseModelMap.get(responseModelKey);

    return responseModelResult;
  }
}

export default UserService;
