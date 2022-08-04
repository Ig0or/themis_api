import { createInjector } from "typed-inject";
import { MongoRepository } from "../../repositories/mongodb";
import { PostService, UserService } from "../../services";

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
