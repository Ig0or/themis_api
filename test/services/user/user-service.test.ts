// Local
import UserService from "@services/user/user-service";
import makeSut from "./make-sut";
import {
  allPostsStub,
  allUsersStub,
  emptyResponseStub,
  invalidDeletedUserStub,
  invalidEditedUserStub,
  validDeletedUserStub,
  validEditedUserStub,
  validResponseStub,
  validUserId,
} from "./stubs";

describe("User Service", () => {
  let {
    userRepositoryInstanceMock,
    postRepositoryInstanceMock,
    sutUserService,
  } = makeSut();

  beforeEach(() => {
    jest.clearAllMocks();
    new UserService();
  });

  describe("getAllUsers", () => {
    it("Should return response model with all users", async () => {
      userRepositoryInstanceMock.getAllUsers.mockResolvedValue(allUsersStub);

      const responseModel = await sutUserService.getAllUsers();

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result[0]).toHaveProperty("userName");
      expect(responseModel.result[0]).toHaveProperty("createdAt");
      expect(responseModel.result[0]).toHaveProperty("userId");
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.getAllUsers.mockRejectedValue(new Error());

      const responseModel = await sutUserService.getAllUsers();

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("getUserById", () => {
    it("Should return response model with user and their posts if userId is valid", async () => {
      userRepositoryInstanceMock.getUserById.mockResolvedValue(allUsersStub[0]);
      postRepositoryInstanceMock.getPostsByUserId.mockResolvedValue(
        allPostsStub
      );

      const responseModel = await sutUserService.getUserById(validUserId);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toMatchObject(validResponseStub);
    });

    it("Should return response model with empty result if userId is invalid", async () => {
      userRepositoryInstanceMock.getUserById.mockResolvedValue(undefined);

      const responseModel = await sutUserService.getUserById("invalid userId");

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual({});
    });

    it("Should return response model with guard values if db dont bring correct user information", async () => {
      userRepositoryInstanceMock.getUserById.mockResolvedValue({});

      const responseModel = await sutUserService.getUserById(validUserId);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toMatchObject(emptyResponseStub);
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.getUserById.mockRejectedValue(new Error());

      const responseModel = await sutUserService.getUserById(validUserId);

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("createUser", () => {
    it("Should create user", async () => {
      const responseModel = await sutUserService.createUser({
        userName: "mariazinha",
      });

      expect(responseModel.statusCode).toEqual(201);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("User created");
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.createUser.mockRejectedValue(new Error());

      const responseModel = await sutUserService.createUser({
        userName: "mariazinha",
      });

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("deleteUser", () => {
    it("Should delete user if the userId is valid", async () => {
      userRepositoryInstanceMock.deleteUser.mockResolvedValue(
        validDeletedUserStub
      );

      const responseModel = await sutUserService.deleteUser(validUserId);

      expect(responseModel.statusCode).toEqual(200);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("The user was deleted");
    });

    it("Shouldn't delete user if the userId is invalid", async () => {
      userRepositoryInstanceMock.deleteUser.mockResolvedValue(
        invalidDeletedUserStub
      );

      const responseModel = await sutUserService.deleteUser("invalid user id");

      expect(responseModel.statusCode).toEqual(404);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "This user doesn't exist or wasn't deleted."
      );
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.deleteUser.mockRejectedValue(new Error());

      const responseModel = await sutUserService.deleteUser(validUserId);

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });

  describe("editUser", () => {
    it("Should edit user if the userId is valid", async () => {
      userRepositoryInstanceMock.editUser.mockResolvedValue(
        validEditedUserStub
      );

      const responseModel = await sutUserService.editUser(
        { userName: "felipao" },
        validUserId
      );

      expect(responseModel.statusCode).toEqual(201);
      expect(responseModel.success).toEqual(true);
      expect(responseModel.result).toEqual("The user was updated.");
    });

    it("Shouldn't edit user if the userId is invalid", async () => {
      userRepositoryInstanceMock.editUser.mockResolvedValue(
        invalidEditedUserStub
      );

      const responseModel = await sutUserService.editUser(
        { userName: "felipao" },
        "invalid userId"
      );

      expect(responseModel.statusCode).toEqual(404);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual("This user id doesn't exist");
    });

    it("Should return response model with error if catch an error", async () => {
      userRepositoryInstanceMock.editUser.mockRejectedValue(new Error());

      const responseModel = await sutUserService.editUser(
        { userName: "felipao" },
        validUserId
      );

      expect(responseModel.statusCode).toEqual(500);
      expect(responseModel.success).toEqual(false);
      expect(responseModel.message).toEqual(
        "We have some problems. Try again later."
      );
    });
  });
});
