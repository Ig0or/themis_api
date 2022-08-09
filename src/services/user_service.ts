import { User } from "../domain/models";
import { dependenciesContainer } from "../infrastructure/DI";
import { MongoRepository } from "../repositories/mongodb";

class UserService {
    _mongoRepository: MongoRepository;
    constructor(
        mongoRepository: MongoRepository = dependenciesContainer.repositories.mongoRepository.injectClass(
            MongoRepository
        )
    ) {
        this._mongoRepository = mongoRepository;
    }

    async getAllUsers(): Promise<Array<User>> {
        const posts = await this._mongoRepository.getAllUsers();

        return posts;
    }

    async getUserById(userId: string): Promise<User> {
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
