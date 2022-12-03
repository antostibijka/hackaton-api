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
    return await this.prismaService.users.findFirst({
      where: {
        username: loginUserDto.username
      },
      select: {
        username: true,
        email: true,
        isActive: true
      }
    });
  }

  async isRegistered(registerUserDto: RegisterUserDto)
  {
    return await this.prismaService.users.findFirst({
      where: {
        OR: [
          {email: registerUserDto.email},
          {username: registerUserDto.username}
        ]
      },
    });
  }

  async userRegister(registerUserDto: RegisterUserDto, activationId: string)
  {
      return await this.prismaService.users.create({
        data: {
          username: registerUserDto.username,
          password: registerUserDto.password,
          email: registerUserDto.email,
          activationId,
        }
      });
  }

  async activateUser(uuid: string)
  {
    return await this.prismaService.users.updateMany({
      where: {
        activationId: uuid
      },
      data: {
        isActive: true
      }
    })
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