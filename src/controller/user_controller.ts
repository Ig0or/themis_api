import { Request, Response } from "express";

import { User } from "../domain/models";
import { dependenciesContainer } from "../infrastructure/DI";
import { UserService } from "../services";

class UserController {
    private _userService: UserService;
    constructor(
        userService: UserService = dependenciesContainer.services.postService.injectClass(
            UserService
        )
    ) {
        this._userService = userService;
    }

    async getAllUSers(
        request: Request,
        response: Response
    ): Promise<Response<Array<User>>> {
        const users = await this._userService.getAllUsers();

        return response.json(users);
    }

    async getUserById(
        request: Request,
        response: Response
    ): Promise<Response<User>> {
        const userId = request.params.id;
        const user = await this._userService.getUserById(userId);

        return response.json(user);
    }
}

export { UserController };
