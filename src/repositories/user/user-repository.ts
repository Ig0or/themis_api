// Third Party
import { camelizeKeys } from "humps";
import { Collection } from "mongodb";

// Local
import UserModel from "@domain/models/user/user-model";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

class UserRepository extends BaseMongoRepository {
  private _usersConnection: Collection;

  constructor() {
    super();

    this._usersConnection = this.mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "user"
    );
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const response = this._usersConnection.find({}, { projection: { _id: 0 } });
    const arrayUsers = await response.toArray();
    const camelizedUsers: any = camelizeKeys(arrayUsers);

    return camelizedUsers;
  }

  async getUserById(userId: string): Promise<UserModel> {
    const response = await this._usersConnection.findOne(
      { user_id: userId },
      { projection: { _id: 0 } }
    );
    const camelizedUser: any = camelizeKeys(response);

    return camelizedUser;
  }
}

export default UserRepository;
