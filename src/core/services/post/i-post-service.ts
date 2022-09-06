// Local
import ResponseModel from "@domain/models/response/response-model";
import PostInput from "@domain/types/post/post-input";

interface IPostService {
  getAllPosts(): Promise<ResponseModel>;

  getPostById(postId: string): Promise<ResponseModel>;

  createPost(post: PostInput): Promise<ResponseModel>;

  editPost(postChanges: PostInput, postId: string): Promise<ResponseModel>;

  deletePost(postId: string): Promise<ResponseModel>;
}

export default IPostService;
