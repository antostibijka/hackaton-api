import { Body, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dtos/login-user.dto";
import { AppRepository } from "./app.repository";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { AddFavouriteDto } from "./dtos/add-favourite.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository, private readonly mailerService: MailerService) {}

  async userLogin(loginUserDto: LoginUserDto) {
    const data = await this.appRepository.userLogin(loginUserDto);
    if (!data) {
      throw new NotFoundException('Wrong username or password!');
    }
    if (data.isActive == false) {
      throw new UnauthorizedException('User account is not active!');
    }
    delete data.isActive;
    const token = uuidv4();
    const tokenCreate = await this.appRepository.createUserToken(data.id, token)
    if (tokenCreate)
    {
      return { data, status: 'success', token };
    }
  }

  async userRegister(registerUserDto: RegisterUserDto) {
    const isRegistered = await this.appRepository.isRegistered(registerUserDto);
    if (isRegistered) {
      throw new UnauthorizedException('Given user is already registered!');
    }
      const uuidRandom = uuidv4();
      await this.sendEmail(registerUserDto.email, uuidRandom);
        const data = await this.appRepository.userRegister(registerUserDto, uuidRandom);
        delete data.password;
        delete data.activationId;
        return {data, status: 'success'}
  }

  async sendEmail(email: string, uuidRandom: string)
  {
    const isSent = await this.mailerService
      .sendMail({
        to: email,
        from: 'silevishackaton@outlook.com',
        subject: 'Activate your account.',
        text: `Click the link to activate your account:\n http://localhost:3000/activate-user/${uuidRandom}`,
        html: `<p>Click the link to activate your account:\n http://localhost:3000/activate-user/${uuidRandom}`
      });
    if (!isSent) {
      throw new Error('Request was failed');
    }
    else {
      return isSent;
    }
  }

  async activateUser(uuid: string)
  {
    const data = await this.appRepository.activateUser(uuid);
    if (data)
    {
      return { status: 'success'};
    }
  }

  async addFavourite(addFavouriteDto: AddFavouriteDto)
  {
    if (await this.appRepository.checkToken(addFavouriteDto.userId, addFavouriteDto.token)) {
      return await this.appRepository.addFavourite(addFavouriteDto);
    }
    else {
      throw new UnauthorizedException('Your token is invalid!');
    }
  }

  async getFavourites(userId: number, token: string)
  {
    if (await this.appRepository.checkToken(userId, token)) {
      const data = await this.appRepository.getFavourites(userId);
      const ids = [];
      data.forEach(userFav => {
        delete userFav.userId;
        delete userFav.id;
        ids.push(userFav.playerId)
      })
      const queryParam = new URLSearchParams({ id: ids.toString() }).toString();
      const userFavPlayers = await fetch('https://hackathon-api-2.onrender.com/data-science/api/players-bio/?' + queryParam + "/");
      return {data, status: 'success', players: await userFavPlayers.json()}
    }
    else {
      throw new UnauthorizedException('Your token is invalid!');
    }
  }

  async deleteFavourite(userId: number, playerId: number, token: string)
  {
    if (await this.appRepository.checkToken(userId, token)) {
      return await this.appRepository.deleteFavourite(userId, playerId);
    }
    else {
      throw new UnauthorizedException('Your token is invalid!');
    }
  }

  async deleteToken(userId: number)
  {
    return await this.appRepository.deleteUserToken(userId);
  }
}
