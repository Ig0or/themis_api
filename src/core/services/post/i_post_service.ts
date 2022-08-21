// Local
import { ResponseModel } from "@domain/models";
import { PostInput } from "@domain/types";

interface IPostService {
    getAllPosts(): Promise<ResponseModel>;
    getPostById(postId: string): Promise<ResponseModel>;
    createPost(post: PostInput): Promise<ResponseModel>;
}

export { IPostService };
