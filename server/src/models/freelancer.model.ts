import { Schema, model } from "mongoose";

export interface Freelancer{
    id:string;
    email:string;
    name:string;
    isAdmin:boolean;
    status:string;
    address:string;
    phone:string;
    password:string;
}   

export const FreelancerSchema =new Schema<Freelancer>(
    {
        name:{type:String,required:false},
        email:{type:String,required:true},
        status:{type:String,required:false},
        isAdmin:{type:Boolean,required:true},
        address:{type:String,required:false},
        phone:{type:String,required:false},
        password:{type:String,required:true},
        

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