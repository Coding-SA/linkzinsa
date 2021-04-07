import { Module } from "@nestjs/common";
import { ProfileController } from "./controllers/profile-controller";
import { UserController } from "./controllers/users-controller";
import { ProfileService } from "./services/profile-service";
import { UserService } from "./services/user-service";


@Module({
    controllers: [
        UserController,
        ProfileController
    ],
    providers: [
        UserService,
        ProfileService
    ]
})
export class ApiModule{}