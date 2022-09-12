// Third Party
import { createInjector } from "typed-inject";

// Local
import PostService from "@services/post/post-service";
import UserService from "@services/user/user-service";
import PostRepository from "@repositories/post/post-repository";
import UserRepository from "@repositories/user/user-repository";

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
    baseMongoRepository: createInjector(),
    postRepository: createInjector(),
    userRepository: createInjector(),
  },
};

export default dependenciesContainer;
