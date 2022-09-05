// Local
import { ResponseModel } from "@domain/models";
import { PostInput } from "@domain/types";

interface IPostService {
  getAllPosts(): Promise<ResponseModel>;

  getPostById(postId: string): Promise<ResponseModel>;

  createPost(post: PostInput): Promise<ResponseModel>;

  editPost(postChanges: PostInput, postId: string): Promise<ResponseModel>;
}

export { IPostService };
