// Third Party
import { Collection, DeleteResult, UpdateResult } from "mongodb";

// Local
import IUserRepository from "@core/repositories/user/i-user-repository";
import UserModel from "@domain/models/user/user-model";
import UserInput from "@domain/types/user/user-input";
import dependenciesContainer from "@infrastructure/DI/modules";
import MongoInfrastructure from "@infrastructure/mongodb/mongodb-infrastructure";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

class UserRepository extends BaseMongoRepository implements IUserRepository {
  private _usersConnection: Collection;

  constructor(
    mongoInfrastructure: MongoInfrastructure = dependenciesContainer.infrastructure.mongoInfrastructure.injectClass(
      MongoInfrastructure
    )
  ) {
    super(mongoInfrastructure);

    this._usersConnection = this.mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "users"
    );
  }

  async getAllUsers(): Promise<Array<any>> {
    const response = await this._usersConnection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return response;
  }

  async getUserById(userId: string): Promise<any> {
    const response = await this._usersConnection.findOne(
      { user_id: userId },
      { projection: { _id: 0 } }
    );

    return response;
  }

  async createUser(user: UserModel): Promise<void> {
    await this._usersConnection.insertOne(user);

    return;
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    const response = await this._usersConnection.deleteOne({ user_id: userId });

    return response;
  }

  async editUser(user: UserInput, userId: string): Promise<UpdateResult> {
    const response = await this._usersConnection.updateOne(
      { user_id: userId },
      { $set: { user_name: user.userName } }
    );

    return response;
  }
}

export default UserRepository;
