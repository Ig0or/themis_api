// Third Party
import { camelizeKeys, decamelizeKeys } from "humps";
import { Collection } from "mongodb";

// Local
import IUserRepository from "@core/repositories/user/i-user-repository";
import UserModel from "@domain/models/user/user-model";
import BaseMongoRepository from "@repositories/base/mongodb/base-repository";

class UserRepository extends BaseMongoRepository implements IUserRepository {
  private _usersConnection: Collection;

  constructor() {
    super();

    this._usersConnection = this.mongoInfrastructure.getConnection(
      process.env.MONGO_DB_URI!,
      "studies",
      "users"
    );
  }

  async getAllUsers(): Promise<Array<UserModel>> {
    const response = await this._usersConnection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    const camelizedUsers: any = camelizeKeys(response);

    const arrayUsersModel = camelizedUsers.map((user) => {
      const userModel: UserModel = {
        userId: user.userId || "",
        userName: user.userName || "",
        createdAt: user.createdAt || "",
      };

      return userModel;
    });

    return arrayUsersModel;
  }

  async getUserById(userId: string): Promise<UserModel> {
    const response = await this._usersConnection.findOne(
      { user_id: userId },
      { projection: { _id: 0 } }
    );

    if (response) {
      const camelizedUser: any = camelizeKeys(response);
      const userModel: UserModel = {
        userId: camelizedUser.userId || "",
        userName: camelizedUser.userName || "",
        createdAt: camelizedUser.createdAt || "",
      };

      return userModel;
    }
  }

  async createUser(user: UserModel): Promise<void> {
    const decamelizePost = decamelizeKeys(user);
    await this._usersConnection.insertOne(decamelizePost);

    return;
  }
}

export default UserRepository;
