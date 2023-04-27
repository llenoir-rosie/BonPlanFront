import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'; 
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
nouvelleNote: Number[];
newBP: Bonplan;
submitted: Boolean;
note_user: String[];

constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRefs: MatDialog) { 
    this.ville_name = data.nameCity
    this.activity_type = data.nameActivity
    }

ngOnInit() {
    this.submitted = false;
    this.newBPForm = new FormGroup (
        {
            ville_name : new FormControl('', Validators.required),
            activity_type : new FormControl('', Validators.required),
            name : new FormControl('', Validators.required),
            address : new FormControl('', Validators.required),
            note : new FormControl('', Validators.required)
        }
    )
}

public addNewBP() {
    this.submitted = true; //une fois le formulaire soumis on peut afficher les messages d'erreurs s'ils existent
    if (!this.f['name'].errors && !this.f['address'].errors) {
        this.note_user = [localStorage.getItem('currentUser')!];
        this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address,
            localStorage.getItem('currentUser')!, this.nouvelleNote, this.note_user, Date.now());
        this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/newbonplan', this.newBP).subscribe((data) => {
            this.dialogRefs.closeAll();
          })
    }
}

public noteClick(note:String) {
    this.nouvelleNote = [];
    this.nouvelleNote.push(Number(note));
  }

get f(): { [key: string]: AbstractControl } {
    return this.newBPForm.controls;
  }
}