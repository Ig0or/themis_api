// Third Party
import { v4 as uuidv4 } from "uuid";
import { camelizeKeys, decamelizeKeys } from "humps";

// Local
import IPostService from "@core/services/post/i-post-service";
import IPostRepository from "@core/repositories/post/i-post-repository";
import IUserRepository from "@core/repositories/user/i-user-repository";
import editPostResponseModelMap from "@domain/maps/post/edit-post-response-map";
import removePostResponseModelMap from "@domain/maps/post/remove-post-response-map";
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
      const camelizedPosts: any = camelizeKeys(posts);
      const postsModel = camelizedPosts.map((post) =>
        new PostModel().toModel(post)
      );
      responseModel.result = postsModel;
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

      let postModel;
      if (post) {
        const camelizedPost: any = camelizeKeys(post);
        postModel = new PostModel().toModel(camelizedPost);
      }

      responseModel.result = postModel || {};
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async createPost(post: PostInput): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      const userId = post.userId;
      const user = await this._userRepository.getUserById(userId);

      if (!user) {
        responseModel.statusCode = 404;
        responseModel.success = false;
        responseModel.message =
          "The post wasn't created because this user doesn't exist.";

        return responseModel;
      }

      const postId = uuidv4();
      const createdAt = Date.now();

      const postObject = {
        postId: postId,
        userId: post.userId,
        createdAt: createdAt,
        title: post.title,
        body: post.body,
      };

      const postModel = new PostModel().toModel(postObject);
      const decamelizePostModel: any = decamelizeKeys(postModel);

      await this._postRepository.createPost(decamelizePostModel);

      responseModel.result = "Post created";
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async deletePost(postId: string): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      const wasPostDeleted = await this._postRepository.deletePost(postId);
      responseModel = removePostResponseModelMap.get(
        wasPostDeleted.deletedCount
      );
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  async editPost(
    postChanges: PostInput,
    postId: string
  ): Promise<ResponseModel> {
    let responseModel: ResponseModel = {
      statusCode: 201,
      success: true,
    };

    try {
      const wasPostUpdated = await this._postRepository.editPost(
        postChanges,
        postId
      );

      responseModel = this._editPostGetResponseModel(
        wasPostUpdated.modifiedCount,
        wasPostUpdated.matchedCount
      );
    } catch (error) {
      responseModel.statusCode = 500;
      responseModel.success = false;
      responseModel.message = "We have some problems. Try again later.";
    }

    return responseModel;
  }

  private _editPostGetResponseModel(
    modifiedCount: Number,
    matchedCount: Number
  ): ResponseModel {
    const responseModelKey = `${modifiedCount}, ${matchedCount}`;
    const responseModelResult = editPostResponseModelMap.get(responseModelKey);

    return responseModelResult;
  }
}

export default PostService;
