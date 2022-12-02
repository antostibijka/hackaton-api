import { IsNotEmpty, IsNumber } from "class-validator";

export class AddFavouriteDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  playerId: number;
}
