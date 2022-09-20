// Local
import PostModel from "@domain/models/post/post-model";
import UserModel from "@domain/models/user/user-model";

const validUserId = "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1";

const allUsersStub: Array<UserModel> = [
  {
    userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
    userName: "filipinho",
    createdAt: 1662986707090,
  },
  {
    userId: "16375272-c15b-4cec-92e4-7ccb138e7f6d",
    userName: "josezinho",
    createdAt: 1662990217070,
  },
];

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

const validResponseStub = {
  userId: "b7d4c81f-fcdd-4e9b-9c0a-5ae16131f9c1",
  userName: "filipinho",
  createdAt: 1662986707090,
  posts: [
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
  ],
};

const validEditedUserStub = {
  modifiedCount: 1,
  matchedCount: 1,
  acknowledged: true,
  upsertedCount: 0,
  upsertedId: undefined,
};

const invalidEditedUserStub = {
  modifiedCount: 0,
  matchedCount: 0,
  acknowledged: true,
  upsertedCount: 0,
  upsertedId: undefined,
};

const validDeletedUserStub = {
  acknowledged: true,
  deletedCount: 1,
};

const invalidDeletedUserStub = {
  acknowledged: true,
  deletedCount: 0,
};

export {
  allPostsStub,
  allUsersStub,
  invalidDeletedUserStub,
  invalidEditedUserStub,
  validDeletedUserStub,
  validEditedUserStub,
  validResponseStub,
  validUserId,
};
