// Third Party
import { camelizeKeys, decamelizeKeys } from "humps";
import { Collection, DeleteResult, UpdateResult } from "mongodb";

// Local
import IPostRepository from "@core/repositories/post/i-post-repository";
import PostModel from "@domain/models/post/post-model";
import PostInput from "@domain/types/post/post-input";
import dependenciesContainer from "@infrastructure/DI/modules";
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

class PostRepository extends BaseMongoRepository implements IPostRepository {
  private _postsConnection: Collection;

  constructor(
    mongoInfrastructure: MongoInfrastructure = dependenciesContainer.infrastructure.mongoInfrastructure.injectClass(
      MongoInfrastructure
    )
  ) {
    super(mongoInfrastructure);

    this._postsConnection = this.mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "posts"
    );
  }

  async getAllPosts(): Promise<Array<any>> {
    const response = await this._postsConnection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return response;
  }

  async getPostById(postId: string): Promise<any> {
    const response = await this._postsConnection.findOne(
      { post_id: postId },
      { projection: { _id: 0 } }
    );

    return response;
  }

  async getPostsByUserId(userId: string): Promise<Array<PostModel>> {
    const response = await this._postsConnection
      .find({ user_id: userId }, { projection: { _id: 0 } })
      .toArray();

    return response;

    const camelizedPosts: any = camelizeKeys(response);

    const arrayPostsModel = camelizedPosts.map((post) => {
      const postModel: PostModel = {
        title: post.title || "",
        body: post.body || "",
        userId: post.userId || "",
        postId: post.postId || "",
        createdAt: post.createdAt || 0,
      };

      return postModel;
    });

    return arrayPostsModel;
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

  async deletePost(postId: string): Promise<DeleteResult> {
    const response = await this._postsConnection.deleteOne({ post_id: postId });

    return response;
  }

  async deletePostsByUserId(userId: string): Promise<void> {
    await this._postsConnection.deleteMany({
      user_id: userId,
    });

    return;
  }
}

export default PostRepository;
