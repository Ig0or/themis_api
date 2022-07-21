import { Response, Request } from "express";
import { PostService } from "../services";
import { Post } from "../domain/models";
import { dependenciesContainer } from "../infrastructure/DI";

class PostController {
    private _postService: PostService;
    constructor(
        postService: PostService = dependenciesContainer.services.postService.injectClass(
            PostService
        )
    ) {
        this._postService = postService;
    }

    async getAllPosts(
        request: Request,
        response: Response
    ): Promise<Response<Array<Post>>> {
        const posts = await this._postService.getAllPosts();

        return response.json(posts);
    }

    async getPostById(request: Request, response: Response) {
        const postId = request.params.id;
        const post = await this._postService.getPostById(postId);

        return response.json(post);
    }
}

export { PostController };
