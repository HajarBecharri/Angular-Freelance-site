
import express from "express";
//we need it to have request from other port than 5000
import cors from "cors";
import { sample_cathegorie, sample_project, sample_users } from "./data";
import jwt from "jsonwebtoken"





const app=express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
//to send body to the server we use post 

app.post("/freelancer/login",(req,res)=>{
    const {email,password}=req.body;
    const freelancer=sample_users.find(user=>user.email===email&&
        user.password==password)

    if(freelancer){
        res.send(generateTokenResponce(freelancer));
    }
    else{
        res.status(400).send("Username or password is invalid")
    }

})
app.post("/client/login",(req,res)=>{
    const {email,password}=req.body;
    const client=sample_users.find(user=>user.email===email&&
        user.password==password)

    if(client){
        res.send(generateTokenResponce(client));
    }
    else{
        res.status(400).send("Username or password is invalid")
    }

})

//to generate the token
const generateTokenResponce=(user:any)=>{
    const token = jwt.sign({
        email:user.email,isAdmin:user.isAdmin},"Something",{
            expiresIn:"30d"

        });
    user.token=token;
    return user;
    
}
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get('/projects' , (req , res)=>{
    res.send(sample_project);
});
app.get('/cathegories' , (req,res)=>{
   res.send(sample_cathegorie);
})
app.get('/cathegorie/:cte',(req , res)=>{
    const name = req.params.cte ; 
    const projects = sample_project.filter(item => item.cathegorie === name);
     res.send(projects);
});

app.get('/get_idea' ,(req ,res)=>{
    const projects = sample_project.filter(item => item.done === true); 
    res.send(projects);
    console.log(projects);
})
const port =5000;

app.listen(port,()=>{
    console.log("Website served on http://localhost:" +port);
})