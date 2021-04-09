import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { jwtConstants } from "../auth/constants";
import { AuthService } from "../services/auth-service";
import * as Utils from '../utils';


@Controller('auth')
export class AuthContoller{

    constructor(
        private _authService:AuthService
    ){}


    @Post('login')
    @HttpCode(200)
    async login(@Body() loginData){
        try {
            return await this._authService.login(loginData.username, loginData.password);
        } catch (error) {
            throw this.getAuthError(error.message);
        }
    }


    private getAuthError(message:string){
        const errors = {
            'User not found': Utils.HandleErrors.handleError('User not found', HttpStatus.NOT_FOUND),
            'Failed to validate password': Utils.HandleErrors.handleError('Failed to validate password', HttpStatus.CONFLICT)
        }

        return errors[message] || Utils.HandleErrors.handleError(message, HttpStatus.EXPECTATION_FAILED);
    }
}