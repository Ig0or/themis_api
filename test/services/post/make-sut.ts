// Local
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";
import PostService from "@services/post/post-service";

jest.mock("@repositories/post/post-repository");
jest.mock("@repositories/user/user-repository");

const makeSut = () => {
  const postRepositoryMock = PostRepository as jest.Mock<PostRepository>;
  const userRepositoryMock = UserRepository as jest.Mock<UserRepository>;

  const postRepositoryInstanceMock =
    new postRepositoryMock() as jest.Mocked<PostRepository>;
  const userRepositoryInstanceMock =
    new userRepositoryMock() as jest.Mocked<UserRepository>;

  const sutPostService = new PostService(
    postRepositoryInstanceMock,
    userRepositoryInstanceMock
  );

  return {
    postRepositoryInstanceMock,
    userRepositoryInstanceMock,
    sutPostService,
  };
};

export default makeSut;
