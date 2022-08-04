import { Collection, MongoClient } from "mongodb";

class MongoInfrastructure {
    private static _mongoClient: MongoClient;
    private static _mongoCollection: Collection;
    constructor() {}

    static getClient(
        uri: string,
        database: string,
        collection: string
    ): Collection {
        if (!this._mongoClient) {
            this._mongoClient = new MongoClient(uri);
            this._mongoCollection = this._mongoClient
                .db(database)
                .collection(collection);
        }

        return this._mongoCollection;
    }
}

export { MongoInfrastructure };
