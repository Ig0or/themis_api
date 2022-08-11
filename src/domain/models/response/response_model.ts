type ResponseModel = {
    statusCode: number;
    success: boolean;
    message?: string;
    result?: object | Array<any> | string;
};

export { ResponseModel };
