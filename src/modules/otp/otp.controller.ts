import { Controller, Post,Res,Body,HttpStatus,Put} from '@nestjs/common';
import { OtpService } from './service/otp.services';
import { GenerateOtpRequestDto } from './dto/generate-otp-request.dto';
import { VerifyOtpRequestDto } from './dto/verify-otp-request.dto';

@Controller('otp')
    
export class OtpController {
    constructor(private readonly otpService: OtpService) { }
    @Post('/')
    async create(@Res() response, @Body() generateOtpRequestDto: GenerateOtpRequestDto){
        try {
            const newOtp =  await this.otpService.create(generateOtpRequestDto);
            return response.status(HttpStatus.CREATED).json({
                message: `One Time Password sent to ${generateOtpRequestDto.phoneNumber}`,
                newOtp,});
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: `Error: OTP Not Created :${error}`,
                error: 'Bad Request'
        })};
    }
    
    @Put('/')
    async verify(@Res() response ,@Body() verifyOtpRequestDto:VerifyOtpRequestDto){
        try {
            const result = await this.otpService.verify(verifyOtpRequestDto);
            return response.status(HttpStatus.CREATED).json({
                message: result,
                });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: `Error occure due to :${error}`,
                error: 'Bad Request'
        })};
        
    }


}