type ResponseModel = {
  statusCode: number;
  success: boolean;
  message?: string;
  result?: any | Array<any> | string;
};

export default ResponseModel;
