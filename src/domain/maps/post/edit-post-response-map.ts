// Local
import ResponseModel from "@domain/models/response/response-model";

const editPostResponseModelMap: Map<string, ResponseModel> = new Map([
  [
    "0, 0",
    {
      statusCode: 404,
      success: false,
      message: "This post id doesn't exist.",
    },
  ],
  [
    "0, 1",
    {
      statusCode: 404,
      success: false,
      message: "The post wasn't updated.",
    },
  ],
  [
    "1, 1",
    {
      statusCode: 201,
      success: true,
      result: "The post was updated.",
    },
  ],
]);

export default editPostResponseModelMap;
