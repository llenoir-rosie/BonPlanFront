import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-pop-up-bonplan',
    templateUrl: './pop-up-addBonPlan.component.html',
    styleUrls: ['pop-up-addBonPlan.css'],

  })

export class PopUpComponentAddBonPlan implements OnInit {
newBPForm: FormGroup;
ville_name;
activity_type;
newBP: Bonplan;
constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) { 
    this.ville_name = data.nameCity
    this.activity_type = data.nameActivity
    }

ngOnInit() {
    this.newBPForm = new FormGroup (
        {
            ville_name : new FormControl('', Validators.required),
            activity_type : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            address : new FormControl('', Validators.required), 
        }
    )
}
public addNewBP() {
    this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address, localStorage.getItem('currentUser')!);
    console.log(this.newBP)
    this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/newbonplan', this.newBP).subscribe((data) => {
        this.dialogRefs.closeAll();
      })
}
}