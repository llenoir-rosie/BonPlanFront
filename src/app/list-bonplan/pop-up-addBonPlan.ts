import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";
import { Commentary } from "../Commentary";
import { ListBonplanComponent } from "./list-bonplan.component";
@Component({
    selector: 'app-pop-up-bonplan',
    templateUrl: './pop-up-addBonPlan.component.html',
    styleUrls: ['pop-up-addBonPlan.css'],

  })

export class PopUpComponentAddBonPlan implements OnInit {
newBPForm: FormGroup;
ville_name: String;
activity_type: String;
nouvelleNote: Number[];
noteBP: String;
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
            note : new FormControl('', Validators.required),
            commentary : new FormControl('', Validators.required)
        }
    )
}

public addNewBP() {
    // let listBPComponent: ListBonplanComponent;
    this.submitted = true; //une fois le formulaire soumis on peut afficher les messages d'erreurs s'ils existent
    if (!this.f['name'].errors && !this.f['address'].errors && !this.f['commentary'].errors) {
        this.note_user = [sessionStorage.getItem('currentUser')!];
        this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address,
            sessionStorage.getItem('currentUser')!, this.nouvelleNote, this.note_user, Date.now());
        let newCommentaryObject = new Commentary(this.newBPForm.value.name, sessionStorage.getItem('currentUser')!, this.newBPForm.value.commentary, this.noteBP, this.ville_name, this.activity_type);
        console.log(typeof newCommentaryObject.activity_name)
        this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/newbonplan', this.newBP).subscribe(() => {
            this.http.post("http://localhost:8080/commentaries/create/" + this.newBPForm.value.name + "/" + sessionStorage.getItem('currentUser')!, newCommentaryObject).subscribe(() => {
                this.dialogRefs.closeAll();
                // listBPComponent.ngOnInit();
            })
          })
    }
}

public noteClick(note:String) {
    this.noteBP = note
    this.nouvelleNote = [];
    this.nouvelleNote.push(Number(note));
  }

get f(): { [key: string]: AbstractControl } {
    return this.newBPForm.controls;
  }
}