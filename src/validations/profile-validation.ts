import { Contains, IsDefined, IsIn, IsOptional, IsString, IsUUID } from "class-validator";


export class ProfileParam {
    @IsUUID(4)
    profileId:string;
}

export class ProfileLinkParam extends ProfileParam {
    @IsUUID(4)
    linkId:string;
}

export class UpdateThemeProfileBody {

    @IsDefined()
    @IsString()
    @IsIn(['degrade','image','color'])
    type: 'degrade'|'image'|'color';

    @IsOptional()
    @IsString()
    image_url?: string;

    @IsOptional()
    @IsString()
    color_main?: string;

    @IsOptional()
    @IsString()
    color_secundary?: string;
}

export class UpdateProfile {

    @IsDefined()
    @IsString()
    title:string;

    @IsDefined()
    @IsString()
    bio:string;
}