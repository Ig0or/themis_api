// Local
import ResponseModel from "@domain/models/response/response-model";

const removePostResponseModelMap: Map<number, ResponseModel> = new Map([
  [
    0,
    {
      statusCode: 200,
      success: false,
      result: "The post wasn't deleted.",
    },
  ],
  [
    1,
    {
      statusCode: 200,
      success: true,
      message: "The post was deleted",
    },
  ],
]);

export default removePostResponseModelMap;
