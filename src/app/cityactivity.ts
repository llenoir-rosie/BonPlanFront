import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export class cityactivities{
    city_name : String;
    activity_name : String 
    id : Number
   constructor(id : number, city_name : String, activity_name : String){
    this.id = id;
    this.city_name = city_name;
    this.activity_name = activity_name;
   } 
}