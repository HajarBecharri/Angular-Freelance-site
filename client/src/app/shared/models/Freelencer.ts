import { Project } from "./Project";

export class Freelancer {
    id!:string;
    email!:string;
    name!:string;
    token!:string;
    isAdmin!:boolean;
    ImageUrl!:string;
    phone!:string;
    project!:Project;
}
