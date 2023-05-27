
import express from "express";
//we need it to have request from other port than 5000
import cors from "cors";
import { sample_cathegorie, sample_freelacer, sample_project, sample_users } from "./data";
import jwt from "jsonwebtoken"
import { dbconnect } from "./configs/database.config";
import asynceHandler from 'express-async-handler'
import { Client, ClientModel } from "./models/client.model";
import { Freelancer, FreelancerModel } from "./models/freelancer.model";
import { Project, ProjectModel } from "./models/project.model";
import { CathegorieModel } from "./models/cathegorie.model";
import bcrypt from 'bcryptjs'
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb:any ) => {
      cb(null, 'C:/project_web2/freelance/client/src/assets'); 
    },
    filename: (req: any, file:any, cb:any )=> {
      console.log(file);
      const filename = file.originalname;
      cb(null,filename);
    }
  });

  const upload = multer({ storage });

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
app.get('/projects' , asynceHandler(
    async(req,res)=>{
 const projects = await ProjectModel.find({start:false , done:false}).populate('cathegorie_id');
    res.send(projects)
    }
));
app.get('/cathegories' , asynceHandler(
    async(req ,res)=>{

    const cathegories = await CathegorieModel.find();

     res.send(cathegories);
    }
));
app.get('/cathegorie/:id',asynceHandler(
    async(req,res)=>{
        const id = req.params.id ; 
        const projects = await ProjectModel.find({cathegorie_id : id , start:false , done:false}).populate('cathegorie_id')
        res.send(projects) ;
    }
));
app.get('/get_idea' ,asynceHandler(
    async(req , res)=>{
    const projects = await ProjectModel.find({done:true}).populate('cathegorie_id');
    res.send(projects)
    }
));
app.get('/freelancer/:id',asynceHandler(async(req ,res)=>{
    const id = req.params.id ;
    const freelancer = await FreelancerModel.findOne({_id:id})
    // const freelancer = sample_freelacer.find(item => item.name === name);
    console.log(freelancer);
    res.send(freelancer);
}));
app.get('/project/:id',asynceHandler(
    async(req,res)=>{
        const id = req.params.id ;
        const project = await ProjectModel.findOne({_id:id}).populate('cathegorie_id');
        res.send(project);
    }
));  

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

app.post('/addProject',upload.single('imageFile') ,async(req ,res)=>{
        const newProject:Project = {
         id : '',
         description: req.body.description,
         budjet: req.body.budjet,
         period: req.body.period,
         cathegorie_id: req.body.cathegorieId,
         client_id: req.body.clientId,
         imageUrl: req.body.imageUrl 
        }
        const dbProject = await ProjectModel.create(newProject);
        const cthegorie = await CathegorieModel.findByIdAndUpdate(dbProject.cathegorie_id,{
            $push:{projects:dbProject.id}
        })

        res.send("Project saved");
    }
)

const port =5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" +port);
})

