import { IsBase64, IsBoolean, IsDefined, IsOptional, IsString, IsUrl } from "class-validator";

class BaseLinkBody {
    @IsDefined()
    @IsString()
    title:string;

    @IsDefined()
    @IsString()
    @IsUrl()
    url:string;

    @IsDefined()
    @IsBoolean()
    isPriority: boolean;
}

export class CreateLinkBody extends BaseLinkBody{
    
}

export class UpdateLinkBody extends BaseLinkBody{
    
}

