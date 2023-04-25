import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import { Mauvaisplan } from "../mauvaisplan";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-pop-up-mauvaisplan',
    templateUrl: './pop-up-addMauvaisPlan.html',
    styleUrls: ['pop-up-addBonPlan.css'],

  })

export class PopUpComponentAddMauvaisPlan implements OnInit {
newMPForm: FormGroup;
ville_name;
activity_type;
newMP: Mauvaisplan;
constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) { 
    this.ville_name = data.nameCity
    this.activity_type = data.nameActivity
    }

ngOnInit() {
    this.newMPForm = new FormGroup (
        {
            ville_name : new FormControl('', Validators.required),
            activity_type : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            address : new FormControl('', Validators.required), 
        }
    )
}
public addNewMP() {
    this.newMP = new Mauvaisplan(this.ville_name, this.activity_type, this.newMPForm.value.name, this.newMPForm.value.address, localStorage.getItem('currentUser')!);
    this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/newmauvaisplan', this.newMP).subscribe((data) => {
        this.dialogRefs.closeAll();
      })
}
}