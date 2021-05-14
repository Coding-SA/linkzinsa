import { ArrayContains, ArrayMinSize, IsAlphanumeric, IsEmail, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class FirstStepUser {
	@IsAlphanumeric()
	@MinLength(6)
	@MaxLength(20)
    username:string;

	@IsEmail()
	email:string;

	@IsString()
	@MinLength(8)
	@MaxLength(20)
	password:string;
}


export class SecondStepUser {
	@IsString()
	name: string;

	@ArrayMinSize(3)
	category:Array<string>;
}

export class UsernameParam {
	@IsAlphanumeric()
	@MinLength(6)
	@MaxLength(20)
    username:string;
}