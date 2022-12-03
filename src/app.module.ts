import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prsima.service";
import { AppRepository } from "./app.repository";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports:
    [
      ConfigModule.forRoot(),
      MailerModule.forRootAsync({
        useFactory: () => ({
          transport: {
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
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
