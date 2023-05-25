import { Schema, model } from "mongoose";

export interface Freelancer{
    id:String;
    email:String;
    name?:String;
    isAdmin:boolean;
    address?:String;
    phone?:String;
    password:String;
    token?:String
}   

export const FreelancerSchema =new Schema<Freelancer>(
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
export const FreelancerModel=model<Freelancer>('freelancer',FreelancerSchema);