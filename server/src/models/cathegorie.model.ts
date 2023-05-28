import mongoose, { Schema, model } from "mongoose";

export interface Cathegorie{
    id:string ;
    name:string ;
    projects?:[];
}   

export const CathegorieSchema =new Schema<Cathegorie>(
    {
        name:{type:String,required:true},
        projects:[
            {
                type:mongoose.Types.ObjectId,
                ref:'project'
            }
        ]
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
export const CathegorieModel=model<Cathegorie>('cathegorie',CathegorieSchema);
