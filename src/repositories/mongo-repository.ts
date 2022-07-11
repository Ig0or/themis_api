import { Collection } from "mongodb";

import { MongoInfrastructure } from "../infrastructure/mongo-infra";

class MongoRepository {
    mongoInfrastructure: MongoInfrastructure;
    mongoConnection: Collection;
    constructor() {
        this.mongoInfrastructure = new MongoInfrastructure();
        this.mongoConnection = this.mongoInfrastructure.getConnection(
            "studies",
            "blog"
        );
    }

    async getAllPosts() {
        const posts = await this.mongoConnection
            .find({}, { projection: { _id: 0 } })
            .toArray();

        return posts;
    }
}

export { MongoRepository };
