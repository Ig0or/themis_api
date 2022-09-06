// Third Party
import { createInjector } from "typed-inject";

// Local
import PostService from "@services/post/post-service";
import { UserService } from "@services/index";
import PostRepository from "@repositories/post/post-repository";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

const dependenciesContainer = {
  controllers: {
    postController: createInjector()
      .provideValue("postService", PostService)
      .provideClass("postRepository", PostRepository),
    userController: createInjector()
      .provideValue("userService", UserService)
      .provideClass("mongoRepository", BaseMongoRepository),
  },

  infrastructure: {
    mongoInfrastructure: createInjector(),
  },

  services: {
    postService: createInjector().provideClass(
      "postRepository",
      PostRepository
    ),
    userService: createInjector().provideClass(
      "mongoRepository",
      BaseMongoRepository
    ),
  },

  repositories: {
    baseMongoRepository: createInjector(),
    postRepository: createInjector(),
    userRepository: createInjector(),
  },
};

export default dependenciesContainer;
