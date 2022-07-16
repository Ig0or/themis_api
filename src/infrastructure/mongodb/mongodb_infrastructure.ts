import { Collection, MongoClient } from "mongodb";

class MongoInfrastructure {
    uri: string;
    constructor(uri: string) {
        this.uri = uri;
    }

    protected getClient(): MongoClient {
        const client = new MongoClient(this.uri);

        return client;
    }

    getConnection(database: string, collection: string): Collection {
        const client = this.getClient();
        return client.db(database).collection(collection);
    }
}

export { MongoInfrastructure };
