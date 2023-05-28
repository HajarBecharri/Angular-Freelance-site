import { Schema, model } from "mongoose";

export interface Freelancer{
    id:string;
    email:string;
    emailSecondaire:string;
    firstName:string;
    lastName:string;
    age:Number;
    motivations:string;
    isAdmin:boolean;
    address:string;
    phone:string;
    password:string;
    token:string
}   

export const FreelancerSchema =new Schema<Freelancer>(
    {
        firstName:{type:String,required:false},
        lastName:{type:String,required:false},
        emailSecondaire:{type:String,required:false},
        age:{type:Number,required:false},
        motivations:{type:String,required:false},
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