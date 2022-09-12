// Local
import makeSut from "./make-sut";
import {
  allPostsStub,
  invalidPostInputStub,
  postStub,
  userStub,
  validPostInputStub,
} from "./stubs";

describe("Post Service", () => {
  let {
    postRepositoryInstanceMock,
    userRepositoryInstanceMock,
    sutPostService,
  } = makeSut();

  beforeEach(() => {
    jest.clearAllMocks();
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

      const responseModel = await sutPostService.getPostById(
        "cf07919d-32b8-4eb2-80b6-0916acffc8ad"
      );

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toHaveProperty("title");
    });

    it("Should return empty response model if post ID is invalid", async () => {
      postRepositoryInstanceMock.getPostById.mockResolvedValue(undefined);

      const responseModel = await sutPostService.getPostById("invalid id");

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual({});
    });

    it("Should return response model with error if catch an error", async () => {
      postRepositoryInstanceMock.getPostById.mockRejectedValue(new Error());

      const responseModel = await sutPostService.getPostById(
        "cf07919d-32b8-4eb2-80b6-0916acffc8ad"
      );

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
      expect(responseModel.message).toEqual("Post created");
    });
  });
});
