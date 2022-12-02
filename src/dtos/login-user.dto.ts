import { IsNotEmpty, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

  @ApiProperty({ default: 'username' })
  @IsNotEmpty()
  @Length(3,30)
  @Matches(/^[a-zA-Z0-9._-]{3,30}$/)
  username: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @Length(8, 40)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/)
  password: string;
}
