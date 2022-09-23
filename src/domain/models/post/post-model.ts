class PostModel {
  protected postId: string;
  protected userId: string;
  protected createdAt: number;
  protected title: string;
  protected body: string;

  constructor() {}

  public toModel(post: any): PostModel {
    this.postId = post.postId || "";
    this.userId = post.userId || "";
    this.createdAt = post.createdAt || 0;
    this.title = post.title || "";
    this.body = post.body || "";

    return this;
  }
}

export default PostModel;
