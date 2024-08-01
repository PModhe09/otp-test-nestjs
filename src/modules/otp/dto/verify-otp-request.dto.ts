import { IsDate, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyOtpRequestDto{
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber:string;

    @IsString()
    @IsNotEmpty()
    readonly code:string;

}