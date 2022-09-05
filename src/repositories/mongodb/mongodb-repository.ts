// Third Party
import { camelizeKeys, decamelizeKeys } from "humps";
import { Collection, UpdateResult } from "mongodb";

// Local
import { PostModel, UserModel } from "@domain/models";
import { dependenciesContainer } from "@infrastructure/DI";
import { MongoInfrastructure } from "@infrastructure/mongodb";
import { PostInput } from "@domain/types";

class MongoRepository {
  private _mongoInfrastructure;
  private _postsConnection: Collection;
  private _usersConnection: Collection;

  constructor(
    mongoInfrastructure: MongoInfrastructure = dependenciesContainer.infrastructure.mongoInfrastructure.injectClass(
      MongoInfrastructure
    )
  ) {
    this._mongoInfrastructure = mongoInfrastructure;
    this._postsConnection = this._mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "posts"
    );
    this._usersConnection = this._mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "users"
    );
  }

  async getAllPosts(): Promise<Array<PostModel>> {
    const mongoResponse = this._postsConnection.find(
      {},
      { projection: { _id: 0 } }
    );
    const arrayPosts = await mongoResponse.toArray();
    const camelizedPosts: any = camelizeKeys(arrayPosts);

    return camelizedPosts;
  }

  async getPostById(postId: string): Promise<PostModel> {
    const mongoResponse = await this._postsConnection.findOne(
      { post_id: postId },
      { projection: { _id: 0 } }
    );
    const camelizedPost: any = camelizeKeys(mongoResponse);

    return camelizedPost;
  }

  async getPostsByUserId(userId: string): Promise<Array<PostModel>> {
    const response = this._postsConnection.find(
      { user_id: userId },
      { projection: { _id: 0, user_id: 0 } }
    );
    const arrayPosts = await response.toArray();
    const camelizedPosts: any = camelizeKeys(arrayPosts);

    return camelizedPosts;
  }

  async createPost(post: PostModel): Promise<void> {
    const decamelizePost = decamelizeKeys(post);
    await this._postsConnection.insertOne(decamelizePost);

    return;
  }

  async editPost(post: PostInput, postId: string): Promise<UpdateResult> {
    const response = await this._postsConnection.updateOne(
      { post_id: postId },
      { $set: { title: post.title, body: post.body } }
    );

    return response;
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const response = this._usersConnection.find({}, { projection: { _id: 0 } });
    const arrayUSers = await response.toArray();
    const camelizedUsers: any = camelizeKeys(arrayUSers);

    return camelizedUsers;
  }

  async getUserById(userId: string): Promise<UserModel> {
    const response = await this._usersConnection.findOne(
      { user_id: userId },
      { projection: { _id: 0 } }
    );
    const camelizedUser: any = camelizeKeys(response);

    return camelizedUser;
  }
}

export { MongoRepository };
