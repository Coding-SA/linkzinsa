import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user-service';

@Injectable()
export class AuthService{

    constructor(
        private _userService: UserService,
        private _jwtService:JwtService
        ){}


        async validateUser(username:string, pass:string): Promise<any>{
            const user = await this._userService.getByUsername(username);

            if(!user){
                throw new Error('User not found');
            }

            if(!user.comparePassword(pass)){
                throw new Error('Failed to validate password');
                
            }
            
            const { password, ...rest } = user;
            return rest;
        }

        async login(username:string, password:string){

            const user = await this.validateUser(username,password);

            return {
                access_token: this._jwtService.sign({
                     username: user.username, 
                     id: user.id 
                 }),
            };
        }

}