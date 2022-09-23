// Third Party
import { DeleteResult, UpdateResult } from "mongodb";

// Local
import UserModel from "@domain/models/user/user-model";
import UserInput from "@domain/types/user/user-input";

interface IUserRepository {
  getAllUsers(): Promise<Array<any>>;

  getUserById(userId: string): Promise<any>;

  createUser(user: UserModel): Promise<void>;

  deleteUser(userId: string): Promise<DeleteResult>;

  editUser(user: UserInput, userId: string): Promise<UpdateResult>;
}

export default IUserRepository;
