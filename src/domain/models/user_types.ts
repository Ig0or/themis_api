import { Post } from "./index";

type User = {
    userId?: string;
    userName: string;
    createdAt?: number;
    posts?: Array<Post>;
};

export { User };
