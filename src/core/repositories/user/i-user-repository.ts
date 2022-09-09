// Local
import UserModel from "@domain/models/user/user-model";

interface IUserRepository {
  getAllUsers(): Promise<Array<UserModel>>;

  getUserById(userId: string): Promise<UserModel>;

  createUser(user: UserModel): Promise<void>;
}

export default IUserRepository;
