import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { Response } from 'express';
import { AddFavouriteDto } from "./dtos/add-favourite.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('User')
  @ApiOperation({ description: 'User login'})
  @Post('/login')
  async userLogin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response)
  {
    const data = await this.appService.userLogin(loginUserDto);
    response.cookie('userData', JSON.stringify(data));
    return data;
  }

  @ApiTags('User')
  @ApiOperation({ description: 'User register'})
  @Post('/register')
  async userRegister(@Body() registerUserDto: RegisterUserDto)
  {
    return await this.appService.userRegister(registerUserDto);
  }

  @ApiTags('User')
  @ApiOperation({ description: 'User activate'})
  @Post('/activate-user/:uuid/:userId')
  async activateUser(@Param('uuid') uuid: string)
  {
    return await this.appService.activateUser(uuid);
  }

  @ApiTags('User - Favourites')
  @ApiOperation({ description: 'Add user favourite'})
  @Post("/favourite")
  async addFavourite(@Body() addFavouriteDto: AddFavouriteDto)
  {
    return await this.appService.addFavourite(addFavouriteDto);
  }

  @ApiTags('User - Favourites')
  @ApiOperation({ description: 'Get user favourites'})
  @Get("/favourite/:userId")
  async getFavourites(@Param('userId') userId: number)
  {
    return await this.appService.getFavourites(userId);
  }

  @ApiTags('User - Favourites')
  @ApiOperation({ description: 'Delete user favourites'})
  @Delete("/favourite/:userId")
  async deleteFavourites(
    @Param('userId') userId: number,
    @Body('playerId') playerId: number
    )
  {
    return await this.appService.deleteFavourite(userId, playerId.valueOf());
  }
}
