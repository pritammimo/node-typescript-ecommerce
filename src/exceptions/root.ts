export class HttpException extends Error {
    message: string;
    errorCode:any;
    statusCode: number;
    errors: ErrorCode;
    constructor(message: string, errorCode:ErrorCode, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
export enum ErrorCode {
    USER_ALREADY_EXISTS = 1002,
    USER_NOT_FOUND = 1001,
    INCORRECT_PASSWORD =1003,
    UNPROCESSABLE_ENTITY=2001,
    INTERNAL_EXCEPTION=3001,
    ADDRESS_NOT_FOUND=2002,
    ADDRESS_DOES_NOT_BELONG_TO_USER=2003,
    UNAUTHORIZED=4001,
    PRODUCT_NOT_FOUND=1004
}