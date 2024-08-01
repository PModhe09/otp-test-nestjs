import {Document} from 'mongoose'
export interface IOtp extends Document{
    readonly phoneNumber : string,
    readonly code : string,
    readonly expirationTime: Date
}