import mongoose, { connect,ConnectOptions } from "mongoose";

export const dbconnect= ()=>{
   connect('mongodb+srv://hajar:ZuLZVVKfhLo6Gd39@cluster0.oa1urd4.mongodb.net/AngularSite?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
    ()=>console.log("connecting successfully"),
    (error)=>console.log(error)
    
    )
}