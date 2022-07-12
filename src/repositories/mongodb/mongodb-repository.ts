import { camelizeKeys } from "humps";
import { Collection } from "mongodb";

import { MongoInfrastructure } from "../../infrastructure/mongodb/mongodb-infra";
import { Post } from "../../domain/models/post-types";

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

    async getAllPosts(): Promise<Array<Post>> {
        const posts = await this.mongoConnection
            .find({}, { projection: { _id: 0 } })
            .toArray();
        const camelizedPosts = camelizeKeys(posts) as any as Array<Post>;

        return camelizedPosts;
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.mongoConnection.findOne(
            { unique_id: postId },
            { projection: { _id: 0 } }
        );
        const camelizedPost = camelizeKeys(post) as any as Post;

        return camelizedPost;
    }
}

export { MongoRepository };
