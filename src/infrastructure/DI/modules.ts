// Third Party
import { createInjector } from "typed-inject";

// Local
import { MongoRepository } from "@repositories/index";
import { PostService, UserService } from "@services/index";

const dependenciesContainer = {
    controllers: {
        postController: createInjector()
            .provideValue("postService", PostService)
            .provideClass("mongoRepository", MongoRepository),
        userController: createInjector()
            .provideValue("userService", UserService)
            .provideClass("mongoRepository", MongoRepository),
    },

    infrastructure: {
        mongoInfrastructure: createInjector(),
    },

    services: {
        postService: createInjector().provideClass(
            "mongoRepository",
            MongoRepository
        ),
        userService: createInjector().provideClass(
            "mongoRepository",
            MongoRepository
        ),
    },

    repositories: {
        mongoRepository: createInjector(),
    },
};

export { dependenciesContainer };
