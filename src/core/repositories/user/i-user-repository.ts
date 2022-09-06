// Local
import UserModel from "@domain/models/user/user-model";

interface IUserRepository {
  getAllUsers(): Promise<Array<UserModel>>;

  getUserById(userId: string): Promise<UserModel>;
}

export default IUserRepository;
