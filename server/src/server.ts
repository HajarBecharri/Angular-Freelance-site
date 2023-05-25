
import express from "express";
//we need it to have request from other port than 5000
import cors from "cors";
import { sample_cathegorie, sample_freelacer, sample_project, sample_users } from "./data";
import jwt from "jsonwebtoken"
import { dbconnect } from "./configs/database.config";
import asynceHandler from 'express-async-handler'
import { Client, ClientModel } from "./models/client.model";
import { Freelancer, FreelancerModel } from "./models/freelancer.model";
import { ProjectModel } from "./models/project.model";
import { CathegorieModel } from "./models/cathegorie.model";
import bcrypt from 'bcryptjs'
dbconnect()

const app=express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
//to send body to the server we use post 
app.get("/seed",asynceHandler(
    async(req,res)=>{
        const cath= await CathegorieModel.findById('646d16e7e47085fbfffa1246') 
        const user= await ClientModel.findById('646d0065c660a4596ed1dbe8') 
        const projectCount=await ProjectModel.countDocuments();
        if(projectCount>0){
            res.send(" already done")
            return;
        }
        await ProjectModel.create({description:'bla bla', budjet:'1000$',period:'3j',client_id:user?._id,cathegorie_id:cath?._id})
        res.send("done")
    }
))
app.post("/freelancer/login",asynceHandler(async(req,res)=>{
    const {email,password}=req.body;
    const freelancer=await FreelancerModel.findOne({email,password})
    console.log(freelancer)

    if(freelancer){
        res.send(generateTokenResponse(freelancer));
        console.log(freelancer)
    }
    else{
        res.status(400).send("Username or password is invalid")
    }

}
))
app.post("/client/login",asynceHandler(async(req,res)=>{
    const {email,password}=req.body;
    const client=await ClientModel.findOne({email,password})

    if(client){
        res.send(generateTokenResponse(client));
    }
    else{
        res.status(400).send("Username or password is invalid")
    }

}))

//to generate the token
const generateTokenResponse= (user:any)=>{
    const token=jwt.sign({
     email:user.email,isAdmin:user.isAdmin
    },"sommeRandomText",{expiresIn:"30d"});
    user.token=token;
    console.log(token)
    return user;}

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get('/projects' , (req , res)=>{
    res.send(sample_project.filter(item => item.done === false && item.start == false));
});
app.get('/cathegories' , (req,res)=>{
   res.send(sample_cathegorie);
})
app.get('/cathegorie/:cte',(req , res)=>{
    const name = req.params.cte ; 
    const projects = sample_project.filter(item => item.cathegorie === name);
     res.send(projects) ;
});

app.get('/get_idea' ,(req ,res)=>{
    const projects = sample_project.filter(item => item.done === true); 
    res.send(projects);
});
app.get('/freelancer/:profile', (req ,res)=>{
    const name = req.params.profile ;
    const freelancer = sample_freelacer.find(item => item.name === name);
    console.log(freelancer);
    res.send(freelancer);
});
app.get('/project/:id',(req,res)=>{
    const id = req.params.id ;
    const project = sample_project.find(item => item.id === id);
    res.send(project);
})  

app.post('/register/Freelancer',asynceHandler(
    async(req , res)=>{
        const email  = req.body.email;
       const freelancer = await FreelancerModel.findOne({email});
       if(freelancer){
        res.status(400).send('User is already exist , please login ');
        return;
       } 
       const password = req.body.password
    const encryptedPassword = await bcrypt.hash(password,10);
       const newFrelancer:Freelancer = {
        id : '',
        email,
        password : encryptedPassword ,
        isAdmin : false
          }
          const dbFreelancer = await FreelancerModel.create(newFrelancer);
          res.send(generateTokenResponse(dbFreelancer));
    }
))
app.post('/register/Client',asynceHandler(
    async(req,res)=>{
    const {email , password} = req.body;
    const client = await ClientModel.findOne({email});
        if(client){
            res.status(400).send('User is already exist , please login ');
            return;
        }
    const encryptedPassword = await bcrypt.hash(password,10);
    const newClient:Client = {
        id:'',
        email,
        password:encryptedPassword,
        isAdmin:false
    }
    const dbClinet = await ClientModel.create(newClient);
    res.send(generateTokenResponse(dbClinet));
    }
))


const port =8000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" +port);
})

