// Local
import { PostModel } from "@domain/models/response";

interface IMongoRepository {
  getAllPosts(): Promise<Array<PostModel>>;

  getPostById(postId: string): Promise<PostModel>;

  getPostsByUserId(userId: string): Promise<Array<PostModel>>;

  createPost(post: PostModel): Promise<void>;
}

export { IMongoRepository };
