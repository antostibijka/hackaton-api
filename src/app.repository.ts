import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "./prsima.service";
import { LoginUserDto } from "./dtos/login-user.dto";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { AddFavouriteDto } from "./dtos/add-favourite.dto";

@Injectable()
export class AppRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async userLogin(loginUserDto: LoginUserDto)
  {
    const data = await this.prismaService.users.findFirst({
      where: {
        username: loginUserDto.username
      },
      select: {
        username: true,
        email: true
      }
    });
    if (!data) {
      throw new NotFoundException('Wrong username or password!');
    }
    else {
      return { data, status: 'success' };
    }
  }

  async userRegister(registerUserDto: RegisterUserDto)
  {
    const isExisting = await this.prismaService.users.findFirst({
      where: {
        OR: [
          {email: registerUserDto.email},
          {username: registerUserDto.username}
        ]
      },
    });

    if (isExisting) {
      throw new UnauthorizedException('Given data is already registered!');
    }
    else {
      const registeredUser = await this.prismaService.users.create({
        data: {
          username: registerUserDto.username,
          password: registerUserDto.password,
          email: registerUserDto.email
        }
      });

      return registeredUser;
    }
  }

  async addFavourite(addFavouriteDto: AddFavouriteDto)
  {
    const isFavExisting = await this.prismaService.userFavorites.findFirst({
      where: { userId: addFavouriteDto.userId, playerId: addFavouriteDto.playerId }
    })

    if(isFavExisting) {
      throw new UnauthorizedException('You already added this player to favourites!');
    }

    else {
      await this.prismaService.userFavorites.create({
        data: {
          userId: addFavouriteDto.userId,
          playerId: addFavouriteDto.playerId
        }
      });

      return { status: "success" };
    }
  }

  async getFavourites(userId: number)
  {
    var id = parseInt(String(userId));
    return await this.prismaService.userFavorites.findMany({
      where: {
        userId: id,
      }
    })
  }

  async deleteFavourite(userId: number, playerId: number)
  {
    var idUser = parseInt(String(userId));
    var idPlayer = parseInt(String(playerId));
    const { count } = await this.prismaService.userFavorites.deleteMany({
      where: {
        userId: idUser,
        playerId: idPlayer
      }
    });
    if (count>0) {
      return { status: "success" }
    }
    else {
      throw new NotFoundException("Not found user favourite with playerId: " + idPlayer);
    }

  }
}