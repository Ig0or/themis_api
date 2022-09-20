//Local
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";
import UserService from "@services/user/user-service";

jest.mock("@repositories/user/user-repository");
jest.mock("@repositories/post/post-repository");

const makeSut = () => {
  const userRepositoryMock = UserRepository as jest.Mock<UserRepository>;
  const postRepositoryMock = PostRepository as jest.Mock<PostRepository>;

  const userRepositoryInstanceMock =
    new userRepositoryMock() as jest.Mocked<UserRepository>;
  const postRepositoryInstanceMock =
    new postRepositoryMock() as jest.Mocked<PostRepository>;

  const sutUserService = new UserService(
    userRepositoryInstanceMock,
    postRepositoryInstanceMock
  );

  return {
    userRepositoryInstanceMock,
    postRepositoryInstanceMock,
    sutUserService,
  };
};

export default makeSut;
