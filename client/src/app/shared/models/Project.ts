import { Cathegorie } from "./Cathegorie";
import { Client } from "./Client";
import { Freelancer } from "./Freelencer";

export class Project{
  id!:string;
  description!:string;
  budjet!:string;
  period!:string;
  cathegorie_id!:Cathegorie;
  imageUrl!:string;
  done!:boolean;
  start!:boolean;
  client_id!:string;
  freelancer!:string;
}
