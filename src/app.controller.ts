import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { Response } from 'express';
import { AddFavouriteDto } from "./dtos/add-favourite.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('api')
@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  async userLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response)
  {
    const data = await this.appService.userLogin(loginUserDto);
    response.cookie('userData', JSON.stringify(data));
    return data;
  }

  @Post('/register')
  async userRegister(@Body() registerUserDto: RegisterUserDto)
  {
    return await this.appService.userRegister(registerUserDto);
  }

  @Post("/favourite")
  async addFavourite(@Body() addFavouriteDto: AddFavouriteDto)
  {
    return await this.appService.addFavourite(addFavouriteDto);
  }

  @Get("/favourite/:userId")
  async getFavourites(@Param('userId') userId: number)
  {
    return await this.appService.getFavourites(userId);
  }

  @Delete("/favourite/:userId")
  async deleteFavourites(
    @Param('userId') userId: number,
    @Body('playerId') playerId: number
    )
  {
    return await this.appService.deleteFavourite(userId, playerId.valueOf());
  }
}
