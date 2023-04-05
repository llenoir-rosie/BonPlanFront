import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export class cityactivities{
    cityname : String;
    activityname : String 
   constructor(cityname : String, activityname : String){
    this.cityname = cityname;
    this.activityname = activityname;
   } 
}