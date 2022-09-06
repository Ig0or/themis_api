// Third Party
import { camelizeKeys, decamelizeKeys } from "humps";
import { Collection, DeleteResult, UpdateResult } from "mongodb";

// Local
import IPostRepository from "@core/repositories/post/i-post-repository";
import PostModel from "@domain/models/post/post-model";
import PostInput from "@domain/types/post/post-input";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

class PostRepository extends BaseMongoRepository implements IPostRepository {
  private _postsConnection: Collection;

  constructor() {
    super();

    this._postsConnection = this.mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "posts"
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

  async deletePost(postId: string): Promise<DeleteResult> {
    const response = await this._postsConnection.deleteOne({ post_id: postId });

    return response;
  }
}

export default PostRepository;
