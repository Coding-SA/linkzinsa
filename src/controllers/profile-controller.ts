import { Controller, Get } from "@nestjs/common";
import { ProfileService } from "../services/profile-service";

@Controller('profile')
export class ProfileController{
    constructor(private _profileService: ProfileService){

    }

    // @Get()
    // async list() {
    //     try {
    //         return await this._profileService.getById();
    //     } catch (error) {
    //         console.log(error);
    //         return;
    //     }
            
    // }
}