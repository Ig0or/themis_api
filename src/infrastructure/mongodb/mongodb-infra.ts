import { MongoClient } from "mongodb";

class MongoInfrastructure {
    uri: string;
    constructor() {
        this.uri = process.env.MONGO_DB_URI!;
    }

    protected getClient(): MongoClient {
        const client = new MongoClient(this.uri);

        return client;
    }

    getConnection(database: string, collection: string) {
        return this.getClient().db(database).collection(collection);
    }
}

export { MongoInfrastructure };
