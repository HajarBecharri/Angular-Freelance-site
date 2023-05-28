import { Schema, model } from "mongoose";

export interface Client{
    id:string;
    email:string;
    emailSecondaire:string;
    firstName:string;
    lastName:string;
    age:Number;
    isAdmin:boolean;
    address:string;
    phone:string;
    password:string;
    token:string
}   

export const ClientSchema =new Schema<Client>(
    {
        firstName:{type:String,required:false},
        lastName:{type:String,required:false},
        emailSecondaire:{type:String,required:false},
        age:{type:Number,required:false},
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
