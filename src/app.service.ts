import { Body, Injectable, UnauthorizedException } from "@nestjs/common";
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
    return this.appRepository.userLogin(loginUserDto);
  }

  async userRegister(registerUserDto: RegisterUserDto) {
    const isRegistered = await this.appRepository.isRegistered(registerUserDto);
    if (isRegistered) {
      throw new UnauthorizedException('Given user is already registered!');
    }
    else {
      const uuidRandom = uuidv4();
      this.sendEmail(registerUserDto.email, uuidRandom);
        const data = await this.appRepository.userRegister(registerUserDto, uuidRandom);
        delete data.password;
        return {data, status: 'success'}
    }
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

  async activateUser(uuid: string, userId: string)
  {
    await this.appRepository.activateUser(uuid, userId);
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
