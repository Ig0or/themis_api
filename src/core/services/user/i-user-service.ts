// Local
import ResponseModel from "@domain/models/response/response-model";
import UserInput from "@domain/types/user/user-input";

interface IUserService {
  getAllUsers(): Promise<ResponseModel>;

  getUserById(userId: string): Promise<ResponseModel>;

  createUser(user: UserInput): Promise<ResponseModel>;

  deleteUser(userId: string): Promise<ResponseModel>;
}

export default IUserService;
