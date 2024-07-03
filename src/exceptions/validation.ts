import { HttpException } from "./root";

export class UnprocessableEntityException extends HttpException {
    constructor(errors:any,message: string,errorCode:number) {
        super(message, errorCode,422,errors);
    }
}