import mongoose, { Schema, model } from "mongoose";

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
}   

export const ProjectSchema =new Schema<Project>(
    {
        description:{type:String,required:true},
        budjet:{type:String,required:true},
        period:{type:String,required:true},
        cathegorie_id:{type:mongoose.Schema.Types.ObjectId,
            ref:'cathegorie',
            required:true},
        imageUrl:{type:String,required:false},
        start:{type:Boolean,required:true ,default:false},
        done:{type:Boolean,required:true , default:false},
        client_id:{type:mongoose.Schema.Types.ObjectId,required:true},
        freelancer_id:{type:mongoose.Schema.Types.ObjectId,required:false}
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