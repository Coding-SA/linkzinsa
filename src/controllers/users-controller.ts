import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { DefaultReturn } from "../interfaces/default-return";
import { FirstStepUser } from "../interfaces/user";
import { UserService } from "../services/user-service";

@Controller('users')
export class UserController{

    constructor(private _userService : UserService){

    }
    @Post()
    async create(@Body() data:FirstStepUser): Promise<DefaultReturn>{
        try {
            const user = await this._userService.create(data);

            return {
                statusCode:201,
                message: "Created"
            }
        } catch (error) {
            return {
                statusCode:409,
                message: "User already registered"
            }  
        }
    }

    @Patch('{id}')
    async regiter2StageUser(@Param('id') id:string): Promise<DefaultReturn>{
        try {
            return {
                statusCode:200,
                message: "User modified"
            }
        } catch (error) {
            return {
                statusCode: error.message === 'User not found' ? 404: 409,
                message: error.message
            }  
        }
    }

    @Get()
    async list() {
        return await this._userService.list();
    }



}