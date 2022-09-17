// Local
import makeSut from "./make-sut";
import {
  allPostsStub,
  invalidDeletedPostStub,
  invalidEditedPostStub,
  invalidPostIdStub,
  invalidPostInputStub,
  postStub,
  userStub,
  validDeletedPostStub,
  validEditedPostStub,
  validPostIdStub,
  validPostInputChangesStub,
  validPostInputStub,
} from "./stubs";
import PostService from "@services/post/post-service";

describe("Post Service", () => {
  let {
    postRepositoryInstanceMock,
    userRepositoryInstanceMock,
    sutPostService,
  } = makeSut();

  beforeEach(() => {
    jest.clearAllMocks();
    new PostService();
  });

  describe("getAllPosts", () => {
    it("Should return response model with all posts", async () => {
      postRepositoryInstanceMock.getAllPosts.mockResolvedValue(allPostsStub);
      const responseModel = await sutPostService.getAllPosts();

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result[0]).toHaveProperty("title");
    });

    it("Should return response model with error if catch an error", async () => {
      postRepositoryInstanceMock.getAllPosts.mockRejectedValue(new Error());

      const responseModel = await sutPostService.getAllPosts();

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("getPostById", () => {
    it("Should return response model with post if post ID is valid", async () => {
      postRepositoryInstanceMock.getPostById.mockResolvedValue(postStub);

      const responseModel = await sutPostService.getPostById(validPostIdStub);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toHaveProperty("title");
    });

    it("Should return empty response model if post ID is invalid", async () => {
      postRepositoryInstanceMock.getPostById.mockResolvedValue(undefined);

      const responseModel = await sutPostService.getPostById(invalidPostIdStub);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual({});
    });

    it("Should return response model with error if catch an error", async () => {
      postRepositoryInstanceMock.getPostById.mockRejectedValue(new Error());

      const responseModel = await sutPostService.getPostById(validPostIdStub);

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("createPost", () => {
    it("Shouldn't create post if user id is invalid", async () => {
      userRepositoryInstanceMock.getUserById.mockResolvedValue(undefined);

      const responseModel = await sutPostService.createPost(
        invalidPostInputStub
      );

      expect(responseModel.statusCode).toEqual(404);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "The post wasn't created because this user doesn't exist."
      );
    });

    it("Should create post if user id is valid", async () => {
      userRepositoryInstanceMock.getUserById.mockResolvedValue(userStub);
      postRepositoryInstanceMock.createPost.mockResolvedValue(undefined);

      const responseModel = await sutPostService.createPost(validPostInputStub);

      expect(responseModel.statusCode).toEqual(201);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("Post created");
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.getUserById.mockRejectedValue(new Error());

      const responseModel = await sutPostService.createPost(validPostInputStub);

      expect(postRepositoryInstanceMock.createPost).not.toBeCalled();
      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("deletePost", () => {
    it("Should delete post if post id is valid", async () => {
      postRepositoryInstanceMock.deletePost.mockResolvedValue(
        validDeletedPostStub
      );

      const responseModel = await sutPostService.deletePost(validPostIdStub);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("The post was deleted");
    });

    it("Shouldn't delete post if post id is invalid", async () => {
      postRepositoryInstanceMock.deletePost.mockResolvedValue(
        invalidDeletedPostStub
      );

      const responseModel = await sutPostService.deletePost(invalidPostIdStub);

      expect(responseModel.statusCode).toEqual(404);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "This post doesn't exist or wasn't deleted."
      );
    });

    it("Should return response model with error if catch an error", async () => {
      postRepositoryInstanceMock.deletePost.mockRejectedValue(new Error());

      const responseModel = await sutPostService.deletePost(validPostIdStub);

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("editPost", () => {
    it("Should edit post if postId is valid", async () => {
      postRepositoryInstanceMock.editPost.mockResolvedValue(
        validEditedPostStub
      );

      const responseModel = await sutPostService.editPost(
        validPostInputChangesStub,
        validPostIdStub
      );

      expect(responseModel.statusCode).toEqual(201);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("The post was updated.");
    });

    it("Shouldn't edit post if postId is invalid", async () => {
      postRepositoryInstanceMock.editPost.mockResolvedValue(
        invalidEditedPostStub
      );

      const responseModel = await sutPostService.editPost(
        validPostInputChangesStub,
        invalidPostIdStub
      );

      expect(responseModel.statusCode).toEqual(404);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual("This post id doesn't exist");
    });

    it("Should return response model with error if catch an error", async () => {
      postRepositoryInstanceMock.editPost.mockRejectedValue(new Error());

      const responseModel = await sutPostService.editPost(
        validPostInputChangesStub,
        validPostIdStub
      );

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });
});
