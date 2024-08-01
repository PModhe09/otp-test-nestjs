import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpModule } from './modules/otp/otp.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot(process.env.MONGODB_URI),OtpModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
