// Third Party
import { v4 as uuidv4 } from "uuid";

// Local
import IPostService from "@core/services/post/i-post-service";
import IPostRepository from "@core/repositories/post/i-post-repository";
import IUserRepository from "@core/repositories/user/i-user-repository";
import PostModel from "@domain/models/post/post-model";
import ResponseModel from "@domain/models/response/response-model";
import PostInput from "@domain/types/post/post-input";
import dependenciesContainer from "@infrastructure/DI/modules";
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";

class PostService implements IPostService {
  private _postRepository: IPostRepository;
  private _userRepository: IUserRepository;

  constructor(
    postRepository: IPostRepository = dependenciesContainer.repositories.postRepository.injectClass(
      PostRepository
    ),
    userRepository: IUserRepository = dependenciesContainer.repositories.userRepository.injectClass(
      UserRepository
    )
  ) {
    this._postRepository = postRepository;
    this._userRepository = userRepository;
  }

  async getAllPosts(): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
    };

    try {
      const posts = await this._postRepository.getAllPosts();
      responseModel.result = posts;
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async getPostById(postId: string): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
    };

    try {
      const post = await this._postRepository.getPostById(postId);
      responseModel.result = post || {};
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async createPost(post: PostInput): Promise<ResponseModel> {
    const userId = post.userId;
    const user = await this._userRepository.getUserById(userId);

    if (!user) {
      const responseModel: ResponseModel = {
        statusCode: 404,
        success: false,
        message: "The post wasn't created because this user doesn't exist.",
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

    await this._postRepository.createPost(postObject);

    const responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
      result: "Post created",
    };

    return responseModel;
  }

  async editPost(
    postChanges: PostInput,
    postId: string
  ): Promise<ResponseModel> {
    const wasPostUpdated = await this._postRepository.editPost(
      postChanges,
      postId
    );

    let responseModel: ResponseModel = {
      statusCode: 500,
      success: false,
      result: "The post wasn't updated.",
    };

    if (wasPostUpdated.matchedCount === 0) {
      responseModel = {
        statusCode: 404,
        success: false,
        message: "This post id doesn't exist",
      };
    } else if (wasPostUpdated.modifiedCount === 1) {
      responseModel = {
        statusCode: 201,
        success: true,
        result: "The post was updated.",
      };
    }

    return responseModel;
  }

  async deletePost(postId: string): Promise<ResponseModel> {
    const wasPostDeleted = await this._postRepository.deletePost(postId);

    let responseModel: ResponseModel = {
      statusCode: 500,
      success: false,
      result: "The post wasn't deleted.",
    };

    if (wasPostDeleted.deletedCount === 1) {
      responseModel = {
        statusCode: 200,
        success: true,
        message: "This post was deleted",
      };
    }

    return responseModel;
  }
}

export default PostService;
