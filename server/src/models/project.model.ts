import mongoose, { Schema, model } from "mongoose";
import { FreelancerModel, FreelancerSchema } from "./freelancer.model";
import { ClientModel } from "./client.model";
import { CathegorieModel } from "./cathegorie.model";

export interface Project{
    id:string;
    description:string;
    budjet:string;
    period:string;
    cathegorie_id:mongoose.Schema.Types.ObjectId;
    imageUrl:string;
    start?:boolean;
    done?:boolean;
    client_id:mongoose.Schema.Types.ObjectId;
    freelancer_id?:mongoose.Schema.Types.ObjectId;
    paimentId?:string;
    paied?:boolean;
}   

export const ProjectSchema =new Schema<Project>(
    {
        description:{type:String,required:true},
        budjet:{type:String,required:true},
        period:{type:String,required:true},
        cathegorie_id:{type:mongoose.Schema.Types.ObjectId,required:true,
            ref:CathegorieModel},
        imageUrl:{type:String,required:false},
        start:{type:Boolean,required:true,default:false},
        done:{type:Boolean,required:true,default:false},
        client_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:ClientModel},
        freelancer_id:{type:mongoose.Schema.Types.ObjectId,required:false,ref:FreelancerModel},
        paimentId:{type:String , required:false},
        paied:{type:Boolean ,required:true , default:false }
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
export const ProjectModel=model<Project>('project',ProjectSchema);