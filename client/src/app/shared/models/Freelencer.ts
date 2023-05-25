import { Project } from "./Project";

export class Freelancer {
    id!:string;
    email!:string;
    name!:string;
    token!:string;
    isAdmin!:boolean;
    phone!:string;
    address!:string;
    project!:Project;
    ImageUrl!:string;
}
