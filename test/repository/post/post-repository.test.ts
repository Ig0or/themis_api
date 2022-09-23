import makeSut from "./make-sut";

describe("Post Repository", () => {
  describe("getAllPosts", () => {
    it("sajdswjkd", async () => {
      const { mongoInfrastructureInstanceMock, sutPostRepository } = makeSut();
      mongoInfrastructureInstanceMock.getConnection.mockReturnValue({});

      const b = await sutPostRepository.getAllPosts();

      console.log(b);
    });
  });
});
