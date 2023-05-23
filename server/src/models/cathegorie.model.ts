import { Schema, model } from "mongoose";

export interface Cathegorie{
    id:string ;
    name:string ;
}   

export const CathegorieSchema =new Schema<Cathegorie>(
    {
        name:{type:String,required:true},
        
        

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
