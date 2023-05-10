import { Cathegorie } from "./Cathegorie";

export class Project{
  id!:string;
  description!:string;
  budjet!:string;
  period!:string;
  cathegorie!:Cathegorie;
  imageUrl!:string;
  done!:boolean
}
