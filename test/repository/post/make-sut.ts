import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";
import MongodbInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";
import PostRepository from "@repositories/post/post-repository";

const makeSut = () => {
  const mongoInfrastructureMock =
    MongoInfrastructure as jest.Mock<MongoInfrastructure>;
  const mongoInfrastructureInstanceMock =
    new mongoInfrastructureMock() as jest.Mocked<MongodbInfrastructure>;

  const sutPostRepository = new PostRepository();
};