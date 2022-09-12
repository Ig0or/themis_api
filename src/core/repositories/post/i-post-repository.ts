// Third Party
import { DeleteResult, UpdateResult } from "mongodb";

// Local
import PostModel from "@domain/models/post/post-model";
import PostInput from "@domain/types/post/post-input";

interface IPostRepository {
  getAllPosts(): Promise<Array<PostModel>>;

  getPostById(postId: string): Promise<PostModel>;

  createPost(post: PostModel): Promise<void>;

  editPost(post: PostInput, postId: string): Promise<UpdateResult>;

  getPostsByUserId(userId: string): Promise<Array<PostModel>>;

  deletePost(postId: string): Promise<DeleteResult>;

  deletePostsByUserId(userId: string): Promise<void>;
}

export default IPostRepository;
