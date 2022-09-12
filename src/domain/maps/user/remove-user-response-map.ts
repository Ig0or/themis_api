// Local
import ResponseModel from "@domain/models/response/response-model";

const removeUserResponseModelMap: Map<number, ResponseModel> = new Map([
  [
    0,
    {
      statusCode: 200,
      success: false,
      result: "The user doesn't exist or wasn't deleted.",
    },
  ],
  [
    1,
    {
      statusCode: 200,
      success: true,
      message: "The user was deleted",
    },
  ],
]);

export default removeUserResponseModelMap;
