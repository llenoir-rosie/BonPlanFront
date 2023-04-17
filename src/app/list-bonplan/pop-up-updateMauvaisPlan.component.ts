import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";
import { Mauvaisplan } from "../mauvaisplan";

@Component({
    selector: 'app-pop-up-UpdateMauvaisplan',
    templateUrl: './pop-up-updateMauvaisPlan.component.html',
    styleUrls: ['pop-up-addBonPlan.css'],

  })

export class PopUpComponentUpdateMauvaisPlan implements OnInit {

    updateMPForm: FormGroup;
    ville_name;
    activity_type;
    oldMP: Bonplan;
    newMP: Bonplan;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) { 
    this.ville_name = data.nameCity
    this.activity_type = data.nameActivity
    this.oldMP = data.mp
    }

ngOnInit() {
    this.updateMPForm = new FormGroup (
        {
            ville_name : new FormControl('', Validators.required),
            activity_type : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            address : new FormControl('', Validators.required), 
        }
    )
}
public addNewMP() {
    this.newMP = new Mauvaisplan(this.ville_name, this.activity_type, this.oldMP.name, this.updateMPForm.value.address, localStorage.getItem('currentUser')!);
    this.http.put('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/updatemauvaisplan', this.newMP).subscribe((data) => {
        this.dialogRefs.closeAll();
      })
}
}