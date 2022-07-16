import { camelizeKeys } from "humps";
import { Collection } from "mongodb";

import { Post } from "../../domain/models";

class MongoRepository {
    protected mongoConnection: Collection;
    constructor(mongoConnection: Collection) {
        this.mongoConnection = mongoConnection;
    }

    async getAllPosts(): Promise<Array<Post>> {
        const posts = this.mongoConnection.find({}, { projection: { _id: 0 } });
        const arrayPosts = await posts.toArray();
        const camelizedPosts: any = camelizeKeys(arrayPosts);

        return camelizedPosts;
    }

    async getPostById(postId: string): Promise<Post> {
        const post = await this.mongoConnection.findOne(
            { unique_id: postId },
            { projection: { _id: 0 } }
        );
        const camelizedPost: any = camelizeKeys(post);

        return camelizedPost;
    }
}

export { MongoRepository };
