import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"

@Schema()

export class OtpClass extends Document{
    @Prop()
    phoneNumber:string;

    @Prop()
    code:string

    @Prop()
    expirationTime:Date
}

export const OtpSchema = SchemaFactory.createForClass(OtpClass)