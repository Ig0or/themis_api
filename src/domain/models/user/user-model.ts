// Local
import PostModel from "@domain/models/post/post-model";

class UserModel {
  protected userId: string;
  protected userName: string;
  protected createdAt: number;
  protected posts?: Array<PostModel>;

  constructor() {}

  public toModel(user: any, posts: any = null): UserModel {
    this.userId = user.userId || "";
    this.userName = user.userName || "";
    this.createdAt = user.createdAt || 0;
    this.posts = posts
      ? posts.map((post) => new PostModel().toModel(post))
      : undefined;

    return this;
  }
}

export default UserModel;
