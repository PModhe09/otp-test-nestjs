import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './service/otp.services';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSchema } from './schemas/otp.schemas';

@Module({
    imports:[MongooseModule.forFeature([{name:'Otp',schema:OtpSchema}])],
    controllers:[OtpController],
    providers:[OtpService],
    exports:[OtpService]
})
export class OtpModule{}
