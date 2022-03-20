import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequest {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
