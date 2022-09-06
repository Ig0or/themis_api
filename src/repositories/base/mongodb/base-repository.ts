// Local
import dependenciesContainer from "@infrastructure/DI/modules";
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";

class BaseMongoRepository {
  protected mongoInfrastructure;

  constructor(
    mongoInfrastructure: MongoInfrastructure = dependenciesContainer.infrastructure.mongoInfrastructure.injectClass(
      MongoInfrastructure
    )
  ) {
    this.mongoInfrastructure = mongoInfrastructure;
  }
}

export default BaseMongoRepository;
