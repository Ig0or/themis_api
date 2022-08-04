import { camelizeKeys } from "humps";
import { Collection } from "mongodb";

import {
    dependenciesContainer,
    MongoInfrastructure,
} from "../../infrastructure/";
import { Post } from "../../domain/models";
import { User } from "../../domain/models";

class MongoRepository {
    private _mongoInfrastructure;
    private _postsConnection: Collection;
    private _usersConnection: Collection;
    constructor(
        mongoInfrastructure: MongoInfrastructure = dependenciesContainer.infrastructure.mongoInfrastructure.injectClass(
            MongoInfrastructure
        )
    ) {
        this._mongoInfrastructure = mongoInfrastructure;

        this._postsConnection = this._mongoInfrastructure.getConnection(
            process.env.MONGO_DB_URI!,
            "studies",
            "posts"
        );
        this._usersConnection = this._mongoInfrastructure.getConnection(
            process.env.MONGO_DB_URI!,
            "studies",
            "users"
        );
    }

    async getAllPosts(): Promise<Array<Post>> {
        const response = this._postsConnection.find(
            {},
            { projection: { _id: 0 } }
        );
        const arrayPosts = await response.toArray();
        const camelizedPosts: any = camelizeKeys(arrayPosts);

        return camelizedPosts;
    }

    async getPostById(postId: string): Promise<Post> {
        const response = await this._postsConnection.findOne(
            { unique_id: postId },
            { projection: { _id: 0 } }
        );
        const camelizedPost: any = camelizeKeys(response);

        return camelizedPost;
    }

    // async createPost(post: Post) {
    //     const decamelizePost: any = decamelizeKeys(post);

    //     await this._postsConnection.insertOne(decamelizePost);
    // }

    async getAllUsers(): Promise<Array<User>> {
        const response = this._usersConnection.find(
            {},
            { projection: { _id: 0 } }
        );
        const arrayUSers = await response.toArray();
        const camelizedUsers: any = camelizeKeys(arrayUSers);

        return camelizedUsers;
    }

    // async getUserById(userId: string): Promise<User> {
    //     const response = await this.usersConnection.findOne(
    //         { user_id: userId },
    //         { projection: { _id: 0 } }
    //     );
    //     const camelizedUser: any = camelizeKeys(response);

    //     return camelizedUser;
    // }
}

export { MongoRepository };