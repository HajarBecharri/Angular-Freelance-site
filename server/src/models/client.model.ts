import { Schema, model } from "mongoose";

export interface Client{
    id:String;
    email:String;
    name?:String;
    isAdmin:boolean;
    address?:String;
    phone?:String;
    password:String;
    token?:String;
}   

export const ClientSchema =new Schema<Client>(
    {
        name:{type:String,required:false},
        email:{type:String,required:true},
        isAdmin:{type:Boolean,required:true},
        address:{type:String,required:false},
        phone:{type:String,required:false},
        password:{type:String,required:true},
        token:{type:String,required:false},
        

    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);
export const ClientModel=model<Client>('client',ClientSchema);
