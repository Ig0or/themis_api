// Local
import PostInput from "@domain/types/post/post-input";

const validPostIdStub = "cf07919d-32b8-4eb2-80b6-0916acffc8ad";
const invalidPostIdStub = "invalid id";

const allPostsStub = [
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

const postStub = {
  title: "Titulo do Post",
  body: "Body do Post",
  userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
  postId: "cf07919d-32b8-4eb2-80b6-0916acffc8ad",
  createdAt: 1662990217070,
};

const emptyPostStub = {
  title: "",
  body: "",
  userId: "",
  postId: "",
  createdAt: 0,
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

const userStub = {
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

const invalidEditedPostStub = {
  modifiedCount: 0,
  matchedCount: 0,
  acknowledged: true,
  upsertedCount: 0,
  upsertedId: undefined,
};

export {
  allPostsStub,
  emptyPostStub,
  invalidEditedPostStub,
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
