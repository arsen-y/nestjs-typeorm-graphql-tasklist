import { IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class authCredentialsDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	username: string; 

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minNumbers: 1,
		minSymbols: 1,
		minUppercase: 1
	})
	password: string;
}