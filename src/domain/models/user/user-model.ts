// Local
import { PostModel } from "@domain/models";

type UserModel = {
    userId?: string;
    userName: string;
    createdAt?: number;
    posts?: Array<PostModel>;
};

export { UserModel };
