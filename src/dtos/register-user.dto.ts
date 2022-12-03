import { IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @ApiProperty({ default: 'username' })
  @IsNotEmpty()
  @Length(3,30)
  @Matches(/^[a-zA-Z0-9._-]{3,30}$/)
  username: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 'example@mail.com' })
  @IsNotEmpty()
  @Length(5,320)
  email: string;
}