// Local
import ResponseModel from "@domain/models/response/response-model";

const editUserResponseModelMap: Map<string, ResponseModel> = new Map([
  [
    "0, 0",
    {
      statusCode: 404,
      success: false,
      message: "This user id doesn't exist",
    },
  ],
  [
    "0, 1",
    {
      statusCode: 404,
      success: false,
      message: "The user wasn't updated.",
    },
  ],
  [
    "1, 1",
    {
      statusCode: 201,
      success: true,
      result: "The user was updated.",
    },
  ],
]);

export default editUserResponseModelMap;
