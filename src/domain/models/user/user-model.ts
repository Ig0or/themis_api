// Local
import PostModel from "@domain/models/post/post-model";

type UserModel = {
  userId?: string;
  userName: string;
  createdAt?: number;
  posts?: Array<PostModel>;
};

export default UserModel;
