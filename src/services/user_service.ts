import { MongoRepository } from "../repositories/mongodb";
import { dependenciesContainer } from "../infrastructure/DI";

import { User } from "../domain/models/user_types";

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
}

export { UserService };
