import { PostModel } from "./index";

type User = {
    userId?: string;
    userName: string;
    createdAt?: number;
    posts?: Array<PostModel>;
};

export { User };
