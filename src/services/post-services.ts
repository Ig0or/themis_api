import { MongoRepository } from "../repositories/mongodb/mongodb-repository";

class PostService {
    mongoRepository: MongoRepository;
    constructor(mongoRepository: MongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    async getAllPosts() {
        const posts = await this.mongoRepository.getAllPosts();

        return posts;
    }

    async getPostById(postId: string) {
        const post = await this.mongoRepository.getPostById(postId);

        return post;
    }
}

export { PostService };
