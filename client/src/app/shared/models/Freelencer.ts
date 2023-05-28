import { Project } from "./Project";

export class Freelancer {
    id!:string;
    email!:string;
    name!:string;
    token!:string;
    isAdmin!:boolean;
    phone!:string;
    emailsecondaire!:string;
    gender!:string;
    age!:number;
    firstname!:string;
    lastname!:string;
    motivations!:string
    address!:string;
    project!:Project;
    ImageUrl!:string;
}
