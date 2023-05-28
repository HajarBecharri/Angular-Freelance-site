import mongoose, { Schema, model } from "mongoose";
import { FreelancerModel} from "./freelancer.model";
import { ClientModel } from "./client.model";


export interface MessagerieFreelancer{
    id:string;
    body:string;
    sender_id:mongoose.Schema.Types.ObjectId
    recipient_id:mongoose.Schema.Types.ObjectId;
    
}   

export const MessagerieFreelancerSchema =new Schema<MessagerieFreelancer>(
    {
        body:{type:String,required:false},
        recipient_id:{type:mongoose.Schema.Types.ObjectId,required:false,ref:ClientModel},
        sender_id:{type:mongoose.Schema.Types.ObjectId,required:false,ref:FreelancerModel}
        
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
export const MessagerieFreelancerModel=model<MessagerieFreelancer>('messagerieFreelancer',MessagerieFreelancerSchema);