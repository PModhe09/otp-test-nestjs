import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IOtp } from "../interfaces/IOtp";
import { GenerateOtpRequestDto } from "../dto/generate-otp-request.dto";
import {Model} from 'mongoose';
import {generate} from 'otp-generator';
import twilio = require('twilio');
import { VerifyOtpRequestDto } from "../dto/verify-otp-request.dto";

@Injectable()
export class OtpService{
    constructor(@InjectModel('Otp')private otpSchema:Model <IOtp>){}

    
    async create(generateOtpRequestDto: GenerateOtpRequestDto): Promise<IOtp | null> {
        const { phoneNumber } = generateOtpRequestDto;
        console.log(phoneNumber);
        let otp = generate(4);
        console.log(9,otp);
        const currDate = new Date();
        const otpEntry = await this.otpSchema.findOneAndUpdate(
            { phoneNumber },  
            { $set: { phoneNumber, code: otp, expirationTime: new Date(currDate.getTime() + 60 * 1000) } },  
            { new: true, upsert: true }  
        );
        console.log(process.env.ACCOUNT_SID+" "+process.env.AUTH_TOKEN)
        console.log(otp+" "+phoneNumber+" "+process.env.TWILIO_NUMBER);
        const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        console.log(otp+" "+phoneNumber+" "+process.env.TWILIO_NUMBER);
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_NUMBER
        });
        console.log(10,otpEntry);
        return otpEntry;
    }

    async verify(verifyOtpRequestDto:VerifyOtpRequestDto): Promise<{ verified: boolean; message: string } | null>{
        const { phoneNumber, code } = verifyOtpRequestDto;
        const check = await this.otpSchema.findOne({ phoneNumber });
        if (check.expirationTime <= new Date()) {
            return { verified: false, message: 'OTP Expired' };
          } else if (check && check.code === code) {
            return { verified: true, message: 'OTP Verified' };
          } else {
            return { verified: false, message: 'OTP Incorrect' };
          }
        return {verified:false,message:'OTP Incorrect'};
    }
}