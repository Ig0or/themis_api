// Local
import ResponseModel from "@domain/models/response/response-model";

const removeUserResponseModelMap: Map<number, ResponseModel> = new Map([
  [
    0,
    {
      statusCode: 404,
      success: false,
      message: "This user doesn't exist or wasn't deleted.",
    },
  ],
  [
    1,
    {
      statusCode: 200,
      success: true,
      result: "The user was deleted",
    },
  ],
]);

export default removeUserResponseModelMap;
