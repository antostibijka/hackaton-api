import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddFavouriteDto {

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ default: 20 })
  @IsNotEmpty()
  @IsNumber()
  playerId: number;
}
