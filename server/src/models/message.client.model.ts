import mongoose, { Schema, model } from "mongoose";
import { FreelancerModel} from "./freelancer.model";
import { ClientModel } from "./client.model";


export interface MessagerieClient{
    id:string;
    body:string;
    sender_id:mongoose.Schema.Types.ObjectId
    recipient_id:mongoose.Schema.Types.ObjectId;
    
}   

export const MessagerieClientSchema =new Schema<MessagerieClient>(
    {
        body:{type:String,required:false},
        recipient_id:{type:mongoose.Schema.Types.ObjectId,required:false,ref:FreelancerModel},
        sender_id:{type:mongoose.Schema.Types.ObjectId,required:false,ref:ClientModel}
        
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
export const MessagerieClientModel=model<MessagerieClient>('messagerieClient',MessagerieClientSchema);