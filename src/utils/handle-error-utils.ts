import { HttpException, HttpStatus } from "@nestjs/common";


export function handleError(message:string, httpStatus:HttpStatus){
    return new HttpException({
        status: httpStatus,
        error: message,
        message: message
      },httpStatus)
    
}