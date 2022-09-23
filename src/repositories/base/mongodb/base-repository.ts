// Local
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";

class BaseMongoRepository {
  protected mongoInfrastructure;

  constructor(mongoInfrastructure: MongoInfrastructure) {
    this.mongoInfrastructure = mongoInfrastructure;
  }
}

export default BaseMongoRepository;
