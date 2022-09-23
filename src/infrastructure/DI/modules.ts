// Third Party
import { createInjector } from "typed-inject";

// Local
import PostService from "@services/post/post-service";
import UserService from "@services/user/user-service";
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";

const dependenciesContainer = {
  controllers: {
    postController: createInjector()
      .provideValue("postService", PostService)
      .provideValue("postRepository", PostRepository)
      .provideClass("userRepository", UserRepository),
    userController: createInjector()
      .provideValue("userService", UserService)
      .provideValue("userRepository", UserRepository)
      .provideClass("postRepository", PostRepository),
  },

  infrastructure: {
    mongoInfrastructure: createInjector(),
  },

  services: {
    postService: createInjector()
      .provideValue("postRepository", PostRepository)
      .provideClass("userRepository", UserRepository),
    userService: createInjector()
      .provideValue("userRepository", UserRepository)
      .provideClass("postRepository", PostRepository),
  },

  repositories: {
    postRepository: createInjector().provideClass(
      "mongoInfrastructure",
      MongoInfrastructure
    ),
    userRepository: createInjector().provideClass(
      "mongoInfrastructure",
      MongoInfrastructure
    ),
  },
};

export default dependenciesContainer;
