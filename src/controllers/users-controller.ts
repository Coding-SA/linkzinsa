import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { DefaultReturn } from "../interfaces/default-return-interface";
import { UserService } from "../services/user-service";
import { FirstStepUser, SecondStepUser } from "../validations/user-validations";

@Controller('users')
export class UserController{

    constructor(private _userService : UserService){

    }
    @Post()
    async create(@Body() data:FirstStepUser): Promise<any>{
        try {
            const user = await this._userService.create(data);

            const {password, ...rest} = user;

            return {
                statusCode:201,
                message: "Created",
                user: rest,
            }
        } catch (error) {

            throw new HttpException({
                status: HttpStatus.PRECONDITION_FAILED,
                error: 'User already registered',
                message: 'User already registered'
              }, HttpStatus.PRECONDITION_FAILED);

        }
    }

    @Patch(':id')
    async regiter2StageUser(@Param('id') id:string, @Body() data: SecondStepUser): Promise<DefaultReturn>{
        try {

            await this._userService.additionalDataUser(id, data);
            return {
                statusCode:200,
                message: "User modified"
            }
        } catch (error) {

            const httpStatus = error.message === 'User not found' ? HttpStatus.PRECONDITION_FAILED:HttpStatus.NOT_FOUND
            
            throw new HttpException({
                status: httpStatus,
                error: error.message,
                message: error.message
              },httpStatus);
        }
    }

    @Get()
    async list() {
        try {
            return await this._userService.list();
        } catch (error) {
            console.log(error);
            return;
        }
            
    }



}