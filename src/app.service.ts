import { Body, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AppRepository } from "./app.repository";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { AddFavouriteDto } from "./dtos/add-favourite.dto";

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async userLogin(loginUserDto: LoginUserDto) {
    return this.appRepository.userLogin(loginUserDto);
  }

  async userRegister(registerUserDto: RegisterUserDto) {
    const data = await this.appRepository.userRegister(registerUserDto);
    delete data.password;
    return {data, status: 'success'}
  }

  async addFavourite(addFavouriteDto: AddFavouriteDto)
  {
    return await this.appRepository.addFavourite(addFavouriteDto);
  }

  async getFavourites(userId: number)
  {
    const data = await this.appRepository.getFavourites(userId);
    data.forEach(userFav => {
      delete userFav.userId;
      delete userFav.id;
    })
    return {data, status: 'success'}
  }

  async deleteFavourite(userId: number, playerId: number)
  {
    return await this.appRepository.deleteFavourite(userId, playerId);
  }
}
