import { IsNotEmpty, IsString } from "class-validator";

export class GenerateOtpRequestDto{
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber:string;
}