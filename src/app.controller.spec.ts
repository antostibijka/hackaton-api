import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterUserDto } from "./dtos/register-user.dto";

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('userRegister', () => {
    it('should return registered user and status = "success"', async () => {
      const data =
        {
          username: 'test',
          password: 'test',
          email: 'text@example.com'
        }
      const result = { data, status: 'success'};
      const promiseOfResult = new Promise((resolve, reject) => {
        setTimeout(resolve, 1500)
      })
      await promiseOfResult
      jest.spyOn(appService, "userRegister").mockImplementation(() => new Promise(() => promiseOfResult));

      expect(await appController.userRegister(data)).toBe(result);
    });
  });
});
