type ResponseModel = {
    statusCode: number;
    success: boolean;
    message?: string;
    result?: object | Array<any>;
};

export { ResponseModel };
