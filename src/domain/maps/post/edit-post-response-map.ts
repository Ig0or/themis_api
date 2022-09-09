// Local
import ResponseModel from "@domain/models/response/response-model";

const editPostResponseModelMap: Map<string, ResponseModel> = new Map([
  [
    "0, 0",
    {
      statusCode: 200,
      success: false,
      result: "This post id doesn't exist",
    },
  ],
  [
    "0, 1",
    {
      statusCode: 200,
      success: false,
      result: "The post wasn't updated.",
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
