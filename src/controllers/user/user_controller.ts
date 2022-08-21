// Third Party
import { Request, Response } from "express";

// Local
import { UserModel } from "@domain/models";
import { dependenciesContainer } from "@infrastructure/DI";
import { UserService } from "@services/index";

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
    ): Promise<Response<Array<UserModel>>> {
        const users = await this._userService.getAllUsers();

        return response.json(users);
    }

    async getUserById(
        request: Request,
        response: Response
    ): Promise<Response<UserModel>> {
        const userId = request.params.id;
        const user = await this._userService.getUserById(userId);

        if (!user) {
            const responseMessage = "This user doesn't exist";

            return response.status(404).json(responseMessage);
        }

        return response.json(user);
    }
}

export { UserController };
