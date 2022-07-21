import { createInjector } from "typed-inject";
import { MongoRepository } from "../../repositories/mongodb";
import { PostService } from "../../services";

const dependenciesContainer = {
    services: {
        postService: createInjector().provideClass(
            "mongoRepository",
            MongoRepository
        ),
    },

    repositories: {
        mongoRepository: createInjector(),
    },

    controllers: {
        postController: createInjector()
            .provideValue("postService", PostService)
            .provideClass("mongoRepository", MongoRepository),
    },
};

export { dependenciesContainer };
