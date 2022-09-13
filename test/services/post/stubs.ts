// Local
import PostModel from "@domain/models/post/post-model";
import PostInput from "@domain/types/post/post-input";
import UserModel from "@domain/models/user/user-model";

const validPostIdStub = "cf07919d-32b8-4eb2-80b6-0916acffc8ad";
const invalidPostIdStub = "invalid id";

const allPostsStub: Array<PostModel> = [
  {
    title: "Titulo do Post",
    body: "Body do Post",
    userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
    postId: "cf07919d-32b8-4eb2-80b6-0916acffc8ad",
    createdAt: 1662990217070,
  },
  {
    title: "Titulo do Post 2",
    body: "Body do Post 2",
    userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
    postId: "0aaddbe4-8e14-479a-9380-063e967dda41",
    createdAt: 1662990217925,
  },
];

const postStub: PostModel = {
  title: "Titulo do Post",
  body: "Body do Post",
  userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
  postId: "cf07919d-32b8-4eb2-80b6-0916acffc8ad",
  createdAt: 1662990217070,
};

const validPostInputStub: PostInput = {
  title: "Titulo do post",
  body: "Corpo do post",
  userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
};

const invalidPostInputStub: PostInput = {
  title: "Titulo do post",
  body: "Corpo do post",
  userId: "invalid user id",
};

const userStub: UserModel = {
  userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
  userName: "felipinho",
  createdAt: 1662986707090,
};

const validDeletedPostStub = {
  acknowledged: true,
  deletedCount: 1,
};

const invalidDeletedPostStub = {
  acknowledged: true,
  deletedCount: 0,
};

const validPostInputChangesStub: PostInput = {
  title: "Novo titulo",
  body: "Novo body",
};

const validEditedPostStub = {
  modifiedCount: 1,
  matchedCount: 1,
  acknowledged: true,
  upsertedCount: 1,
  upsertedId: undefined,
};

export {
  allPostsStub,
  invalidPostIdStub,
  invalidPostInputStub,
  invalidDeletedPostStub,
  userStub,
  validDeletedPostStub,
  validEditedPostStub,
  validPostInputChangesStub,
  validPostIdStub,
  validPostInputStub,
  postStub,
};
