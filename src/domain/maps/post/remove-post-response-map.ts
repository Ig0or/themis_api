// Local
import ResponseModel from "@domain/models/response/response-model";

const removePostResponseModelMap: Map<number, ResponseModel> = new Map([
  [
    0,
    {
      statusCode: 404,
      success: false,
      message: "This post doesn't exist or wasn't deleted.",
    },
  ],
  [
    1,
    {
      statusCode: 200,
      success: true,
      result: "The post was deleted",
    },
  ],
]);

export default removePostResponseModelMap;
