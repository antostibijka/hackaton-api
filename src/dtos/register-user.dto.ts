import { IsNotEmpty, Length, Matches } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @Length(3,30)
  @Matches(/^[a-zA-Z0-9._-]{3,30}$/)
  username: string;

  @IsNotEmpty()
  @Length(8, 40)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/)
  password: string;

  @IsNotEmpty()
  @Length(5,320)
  email: string;
}