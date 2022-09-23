import PostRepository from "@repositories/post/post-repository";
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";

jest.mock("@infrastructure/mongodb/mongodb-infrastructure");

const makeSut = () => {
  const mongoInfrastructureMock =
    MongoInfrastructure as jest.Mock<MongoInfrastructure>;
  const mongoInfrastructureInstanceMock =
    new mongoInfrastructureMock() as jest.Mocked<MongoInfrastructure>;

  const sutPostRepository = new PostRepository(mongoInfrastructureInstanceMock);

  return { mongoInfrastructureInstanceMock, sutPostRepository };
};

export default makeSut;
