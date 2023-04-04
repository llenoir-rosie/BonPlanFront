import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
//import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'; 
import { cityactivities } from "../cityactivity";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
    selector : 'app-popup-addact' ,
    templateUrl : 'popupAddAct.component.html',
    //styleUrls: ['../list-bonplan/pop-upp-addBonPlan.css'],
})
export class PopUpAddActivite implements OnInit {

    newActForm : FormGroup;
    ville_name ;
    list_activities ;
    new_act : String;
    newAct : cityactivities;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) {
        this.ville_name = data.nameCity
        this.list_activities = data.listActivities
    }

ngOnInit() {
    this.newActForm = new FormGroup ({
        ville_name : new FormControl('',Validators.required),
        new_act : new FormControl('', Validators.required),
    })
}

public addNewAct(){
    this.newAct = new cityactivities(this.ville_name, this.newActForm.value.new_act);
    //console.log(this.newAct)
    this.http.post('http://localhost:8080/cityactivities/new', this.newAct).subscribe((data)=>
    {this.dialogRefs.closeAll();
    })
}

}