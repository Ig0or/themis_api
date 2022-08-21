// Local
import { UserModel } from "@domain/models";
import { dependenciesContainer } from "@infrastructure/DI";
import { MongoRepository } from "@repositories/index";

class UserService {
    _mongoRepository: MongoRepository;
    constructor(
        mongoRepository: MongoRepository = dependenciesContainer.repositories.mongoRepository.injectClass(
            MongoRepository
        )
    ) {
        this._mongoRepository = mongoRepository;
    }

    async getAllUsers(): Promise<Array<UserModel>> {
        const posts = await this._mongoRepository.getAllUsers();

        return posts;
    }

    async getUserById(userId: string): Promise<UserModel> {
        const user = await this._mongoRepository.getUserById(userId);

        if (user) {
            const userPosts = await this._mongoRepository.getPostsByUserId(
                userId
            );
            user.posts = userPosts;
        }

        return user;
    }
}

export { UserService };
