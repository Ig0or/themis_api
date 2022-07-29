import { camelizeKeys } from "humps";
import { Collection } from "mongodb";

import { MongoInfrastructure } from "../../infrastructure//mongodb/mongodb_infrastructure";
import { Post } from "../../domain/models";

class MongoRepository {
    protected mongoInfrastructure: Collection;
    constructor() {
        this.mongoInfrastructure = MongoInfrastructure.getClient(
            process.env.MONGO_DB_URI!,
            "studies",
            "blog"
        );
    }

    async getAllPosts(): Promise<Array<Post>> {
        const response = this.mongoInfrastructure.find(
            {},
            { projection: { _id: 0 } }
        );
        const arrayPosts = await response.toArray();
        const camelizedPosts: any = camelizeKeys(arrayPosts);

        return camelizedPosts;
    }

    async getPostById(postId: string): Promise<Post> {
        const response = await this.mongoInfrastructure.findOne(
            { unique_id: postId },
            { projection: { _id: 0 } }
        );
        const camelizedPost: any = camelizeKeys(response);

        return camelizedPost;
    }

    async createPost(post: Post) {
        await this.mongoInfrastructure.insertOne(post);
    }
}

export { MongoRepository };
