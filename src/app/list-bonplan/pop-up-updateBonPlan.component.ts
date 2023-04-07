import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-pop-up-Updatebonplan',
    templateUrl: './pop-up-updateBonPlan.component.html',
    styleUrls: ['pop-up-addBonPlan.css'],

  })

export class PopUpComponentUpdateBonPlan implements OnInit {

    updateBPForm: FormGroup;
    ville_name;
    activity_type;
    oldBP: Bonplan;
    newBP: Bonplan;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) { 
    this.ville_name = data.nameCity
    this.activity_type = data.nameActivity
    this.oldBP = data.bp
    }

ngOnInit() {
    this.updateBPForm = new FormGroup (
        {
            ville_name : new FormControl('', Validators.required),
            activity_type : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            address : new FormControl('', Validators.required), 
        }
    )
}
public addNewBP() {
    this.newBP = new Bonplan(this.ville_name, this.activity_type, this.oldBP.name, this.updateBPForm.value.address);
    console.log(this.newBP)
    this.http.put('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/updatebonplan', this.newBP).subscribe((data) => {
        this.dialogRefs.closeAll();
      })
}
}