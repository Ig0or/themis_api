// Third Party
import { v4 as uuidv4 } from "uuid";

// Local
import { IPostService } from "@core/services";
import { PostModel } from "@domain/models";
import { ResponseModel } from "@domain/models/";
import { PostInput } from "@domain/types";
import { dependenciesContainer } from "@infrastructure/DI";
import { MongoRepository } from "@repositories/index";

class PostService implements IPostService {
  private _mongoRepository: MongoRepository;

  constructor(
    mongoRepository: MongoRepository = dependenciesContainer.repositories.mongoRepository.injectClass(
      MongoRepository
    )
  ) {
    this._mongoRepository = mongoRepository;
  }

  async getAllPosts(): Promise<ResponseModel> {
    const posts = await this._mongoRepository.getAllPosts();

    const responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
      result: posts,
    };

    return responseModel;
  }

  async getPostById(postId: string): Promise<ResponseModel> {
    const post = await this._mongoRepository.getPostById(postId);

    if (!post) {
      const responseModel: ResponseModel = {
        statusCode: 404,
        success: false,
        message: "This post doesn't exist.",
      };

      return responseModel;
    }

    const responseModel: ResponseModel = {
      statusCode: 200,
      success: true,
      result: post,
    };

    return responseModel;
  }

  async createPost(post: PostInput): Promise<ResponseModel> {
    const userId = post.userId;
    const user = await this._mongoRepository.getUserById(userId);

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

    await this._mongoRepository.createPost(postObject);

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
    const wasPostUpdated = await this._mongoRepository.editPost(
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
}

export { PostService };
