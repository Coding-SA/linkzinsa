import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth/constants";
import { JwtStrategy } from "./auth/jwt-strategy";
import { AuthContoller } from "./controllers/auth-controller";
import { IndexController } from "./controllers/index-controller";
import { ProfileController } from "./controllers/profile-controller";
import { UserController } from "./controllers/users-controller";
import { AuthService } from "./services/auth-service";
import { LinkService } from "./services/link-service";
import { ProfileService } from "./services/profile-service";
import { UserService } from "./services/user-service";


@Module({
    controllers: [
        AuthContoller,
        UserController,
        ProfileController,
        IndexController,
    ],
    providers: [
        AuthService,
        UserService,
        ProfileService,
        JwtStrategy,
        LinkService
    ],
    imports:[
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
        }),
    ]
})
export class ApiModule{}