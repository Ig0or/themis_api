// Third Party
import { Collection, MongoClient } from "mongodb";

class MongoInfrastructure {
  private __connections: Map<Array<string>, Collection>;

  constructor() {
    this.__connections = new Map();
  }

  public getConnection(
    uri: string,
    database: string,
    collection: string
  ): Collection {
    const keyConnection = Array(database, collection);
    let connection = this.__connections.get(keyConnection);

    if (!connection) {
      connection = this._getConnectionByDatabaseAndCollection(
        uri,
        database,
        collection
      );

      this.__connections.set(keyConnection, connection);
    }

    return connection;
  }

  private _getConnectionByDatabaseAndCollection(
    uri: string,
    database: string,
    collection: string
  ): Collection {
    const mongoClient = new MongoClient(uri);
    const mongoCollection = mongoClient.db(database).collection(collection);

    return mongoCollection;
  }
}

export default MongoInfrastructure;
