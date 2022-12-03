import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prsima.service";
import { AppRepository } from "./app.repository";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

@Module({
  imports:
    [
      MailerModule.forRootAsync({
        useFactory: () => ({
          transport: {
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
              user: 'silevishackaton@outlook.com',
              pass: 'Mailer34211'
            },
          },
          defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
          },
          template: {
            dir: process.cwd() + '/templates/',
            adapter: new PugAdapter(),
            options: {
              strict: true,
            }
          }
        })
        })
    ],
  controllers: [AppController],
  providers: [AppService, AppRepository, PrismaService],
})
export class AppModule {}
