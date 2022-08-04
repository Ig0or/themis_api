import { camelizeKeys, decamelizeKeys } from "humps";
import { Collection } from "mongodb";

import { MongoInfrastructure } from "../../infrastructure//mongodb/mongodb_infrastructure";
import { Post } from "../../domain/models";
import { User } from "../../domain/models/user_types";

class MongoRepository {
    protected postsConnection: Collection;
    protected usersConnection: Collection;
    constructor() {
        this.postsConnection = MongoInfrastructure.getClient(
            process.env.MONGO_DB_URI!,
            "studies",
            "posts"
        );
        this.usersConnection = MongoInfrastructure.getClient(
            process.env.MONGO_DB_URI!,
            "studies",
            "users"
        );
    }

    async getAllPosts(): Promise<Array<Post>> {
        const response = this.postsConnection.find(
            {},
            { projection: { _id: 0 } }
        );
        const arrayPosts = await response.toArray();
        const camelizedPosts: any = camelizeKeys(arrayPosts);

        return camelizedPosts;
    }

    async getPostById(postId: string): Promise<Post> {
        const response = await this.postsConnection.findOne(
            { unique_id: postId },
            { projection: { _id: 0 } }
        );
        const camelizedPost: any = camelizeKeys(response);

        return camelizedPost;
    }

    async createPost(post: Post) {
        const decamelizePost: any = decamelizeKeys(post);

        await this.postsConnection.insertOne(decamelizePost);
    }

    async getUserById(userId: string): Promise<User> {
        const response = await this.usersConnection.findOne(
            { unique_id: userId },
            { projection: { _id: 0 } }
        );
        const camelizedUser: any = camelizeKeys(response);

        return camelizedUser;
    }
}

export { MongoRepository };
