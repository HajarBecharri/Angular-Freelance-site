
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
import { MessagerieClientModel } from "./models/message.client.model";
import { MessagerieFreelancerModel } from "./models/message.freelancer.model";
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
app.get("/seeds",asynceHandler(
    async(req,res)=>{
        const cath= await CathegorieModel.findById('646d16e7e47085fbfffa1246') 
        const userc= await ClientModel.findById('64726759005aeb8c1250a58f') 
        
        const projectCount=await ProjectModel.countDocuments();
        
        await ProjectModel.create({description:'Interface graphique python', budjet:'100$',period:'7j',client_id:userc?._id,cathegorie_id:cath?._id})
        res.send("done")
    }
))

app.get("/seed",asynceHandler(async(req,res)=>{
    const myproject=0
    const project=await ProjectModel.findById("647269f7c5215bf13e195bc8").populate("client_id").then((e)=>{
        const myproject=e
        const client=myproject?.client_id
        res.send(myproject)
        
    })
    
}))
app.post("/create",asynceHandler(async(res,req)=>{
    
}))


app.post("/freelancer/login",asynceHandler(async(req,res)=>{
    const {email,password}=req.body;
    const freelancer=await FreelancerModel.findOne({email})
    if(freelancer){
    const check =bcrypt.compareSync(password,freelancer!.password)

    if(check){
        res.send(generateTokenResponse(freelancer));
        
    }
    else{
        res.status(400).send("Username or password is invalid")
    }}
    else {
        res.status(400).send("Username or password is invalid")
    }

}
))
///complete/freelancer/
app.post("/complete/freelancer",asynceHandler(
    async(req,res)=>{
        const {id,emailsecondaire,firstname,lastname,age,motivations,name}=req.body;
        
        const freelancer=await FreelancerModel.updateMany(
            { _id: id },
            { $set: {firstName:firstname,lastName:lastname,emailSecondaire:emailsecondaire,motivations:motivations,age:age ,name:name}},
        );
        if(freelancer)
        res.send(freelancer)
        else
        res.status(400).send("Modification failed") 
    }
))
app.post("/complete/client",asynceHandler(
    async(req,res)=>{
        const {id,emailsecondaire,firstname,lastname,age,name}=req.body;
        console.log(lastname)
        const client=await ClientModel.updateMany(
            { _id: id },
            { $set: {firstName:firstname,lastName:lastname,emailSecondaire:emailsecondaire,age:age ,name:name}},
        );
        if(client)
        res.send(client)
        else
        res.status(400).send("Modification failed") 
    }
))
app.post("/project/start",asynceHandler(
    async(req,res)=>{
        const {id_project,email_freelancer}=req.body
        const freelancer=await FreelancerModel.findOne({email:email_freelancer})
        if(freelancer){
            const project=await ProjectModel.updateOne(
                {_id:id_project},
                {
                  $set:{start:true,freelancer_id:freelancer?._id}  
                }
            );
           
            if(project)
            res.send(freelancer)
            else
            res.status(400).send("error") 
        }
        res.status(400).send("email invalid")
        
    }
))
app.get("/freelancer/get/:id",asynceHandler(
    async(req,res)=>{
        const id_freelancer=req.params.id
        const freelancer=await FreelancerModel.findById(id_freelancer)
        res.send(freelancer)
    }

))
app.get("/project/done/:idProject",asynceHandler(
    async(req,res)=>{
        const id_project=req.params.idProject
        console.log(id_project)
        const project=await ProjectModel.updateOne(
            {_id:id_project},
            {
              $set:{done:true}  
            }
        );
        if(project){
            res.send(project)
        }
        else res.send("")
    }
))

app.get("/freelancer/project/:idfreelancer",asynceHandler(
    async(req,res)=>{
        const id_freelancer=req.params.idfreelancer;
        const projects=await ProjectModel.find({freelancer_id:id_freelancer})
        res.send(projects)
    }
))

app.get("/client/project/:idclient",asynceHandler(
    async(req,res)=>{
        const id_client=req.params.idclient
        const projects=await ProjectModel.find({client_id:id_client})
        res.send(projects)
    }
))

app.post("/client/addMessage",asynceHandler(async(req,res)=>{
    const{body,id_client,id_freelancer}=req.body;
    
    const message=await MessagerieClientModel.create({body:body,sender_id:id_client,recipient_id:id_freelancer})
    if(message){
        res.send(message)
    }
    else {
        res.status(400).send("send failed")
    }
    

}))

app.post("/freelancer/addMessage",asynceHandler(async(req,res)=>{
    const{body,id_client,id_freelancer}=req.body;
    
    const message=await MessagerieFreelancerModel.create({body:body,sender_id:id_freelancer,recipient_id:id_client})
    if(message){
        res.send(message)
    }
    else {
        res.status(400).send("send failed")
    }
    

}))

app.get("/client/getMessagesSenders/:idClient",asynceHandler(async(req,res)=>{
    const idClient= req.params.idClient;
    const messages=await MessagerieFreelancerModel.find({recipient_id:idClient}).populate("sender_id").then((e)=>
     res.send(e)
    )
}))

app.get("/freelancer/getMessagesSenders/:idFreelancer",asynceHandler(async(req,res)=>{
    const idFreelancer= req.params.idFreelancer;
    const messages=await MessagerieClientModel.find({recipient_id:idFreelancer}).populate("sender_id").then((e)=>
     res.send(e)
    )
}))

app.post("/client/login",asynceHandler(async(req,res)=>{
    const {email,password}=req.body;
    
    const client=await ClientModel.findOne({email})
    if(client){
    const check =bcrypt.compareSync(password,client!.password)

    if(check){
        res.send(generateTokenResponse(client));
    }
    else{
        res.status(400).send("Username or password is invalid")
    }}
    else {
        res.status(400).send("Username or password is invalid")
    }

}))
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
    const projects = await ProjectModel.find({done:true}).populate('cathegorie_id').populate('freelancer_id');
    res.send(projects)
    }
));
app.get('/freelancer/:id',asynceHandler(async(req ,res)=>{
    const id = req.params.id ;
    const freelancer = await FreelancerModel.findOne({_id:id})
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
));

app.get('/getproject/:id',asynceHandler(
    async(req ,res)=>{
    const id = req.params.id
    console.log(id);
    const project = await ProjectModel.findOne({_id:id});
    if(!project){
    res.status(404).send("Project Not found");
    }
    else{
    console.log(project);
    res.send(project);
    }
    }
))

app.post('/pay' , asynceHandler(
    async(req,res)=>{
       const id = req.body.id ; 
       const project = await ProjectModel.updateOne({_id:id},{
        $set:{
            paied : true ,
            paimentId : req.body.paimentId 
        }
       });
  if(!project){
    res.status(400).send("Project Not Found");
  }
  else{
     res.send(project);
  }

    })
)



const port =5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" +port);
})

