// Local
import IPostRepository from "@core/repositories/post/i-post-repository";
import IUserRepository from "@core/repositories/user/i-user-repository";
import IUserService from "@core/services/user/i-user-service";
import ResponseModel from "@domain/models/response/response-model";
import dependenciesContainer from "@infrastructure/DI/modules";
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";
import UserInput from "@domain/types/user/user-input";
import { v4 as uuidv4 } from "uuid";
import UserModel from "@domain/models/user/user-model";

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
      responseModel.result = users;
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

      if (user) {
        const userPosts = await this._postRepository.getPostsByUserId(userId);
        user.posts = userPosts;
      }

      responseModel.result = user || {};
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
      const userModel: UserModel = {
        userId: userId,
        createdAt: createdAt,
        userName: user.userName,
      };

      await this._userRepository.createUser(userModel);

      responseModel.result = "User created";
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async deleteUser(userId: string) {
    let responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
    };

    try {
      const werePostsDeleted = this._postRepository.deletePostByUserId(userId);

      console.log(werePostsDeleted);
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }
}

export default UserService;
