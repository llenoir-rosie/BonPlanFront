import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";
import { Commentary } from "../Commentary";
import { ListBonplanComponent } from "./list-bonplan.component";
import * as FileSaver from "file-saver";
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
            // commentary : new FormControl('', Validators.required)
        }
    )
}

public addNewBP() {
    let listBPComponent: ListBonplanComponent;
    this.submitted = true; //une fois le formulaire soumis on peut afficher les messages d'erreurs s'ils existent
    // if (!this.f['name'].errors && !this.f['address'].errors && !this.f['commentary'].errors) {
    //     this.note_user = [sessionStorage.getItem('currentUser')!];
    //     this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address,
    //         sessionStorage.getItem('currentUser')!, this.nouvelleNote, this.note_user, Date.now(), this.newBPForm.value.ImgNewBP);

    //     console.log(this.newBPForm.value.ImgNewBP)
    //     let newCommentaryObject = new Commentary(this.newBPForm.value.name, sessionStorage.getItem('currentUser')!, this.noteBP,this.newBPForm.value.commentary, this.ville_name, this.activity_type)
    //     // let newCommentaryObject = new Commentary(this.newBPForm.value.name,  sessionStorage.getItem('currentUser')!, this.newBPForm.value.commentary, this.noteBP);
    //     this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/newbonplan', this.newBP).subscribe(() => {
    //         this.http.post("http://localhost:8080/commentaries/create/" + this.newBPForm.value.name + "/" + localStorage.getItem('currentUser')!, newCommentaryObject).subscribe(() => {
    //             this.dialogRefs.closeAll();
    //             // listBPComponent.ngOnInit();
    //         })
    //       })
    // }



    this.note_user = [sessionStorage.getItem('currentUser')!];
    this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address,
        sessionStorage.getItem('currentUser')!, this.nouvelleNote, this.note_user, Date.now(), "defaut");


    let NewImg = <HTMLInputElement>document.getElementById("ImgNewBP");
    let FileName = "defaut"
    if (NewImg.files?.length != 0){
        const file1 : File = NewImg.files![0];
        FileName = this.newBP.name + ".jfif";
        FileSaver.saveAs(file1, FileName);
    }

    this.newBP = new Bonplan(this.ville_name, this.activity_type, this.newBPForm.value.name, this.newBPForm.value.address,
        sessionStorage.getItem('currentUser')!, this.nouvelleNote, this.note_user, Date.now(), FileName);

    let Commentaire = (<HTMLInputElement>document.getElementById("commentaire")).value;

    // console.log(this.newBPForm)
    console.log("AddBpCommentaire"+Commentaire)

    
    let newCommentaryObject = new Commentary(this.newBPForm.value.name, sessionStorage.getItem('currentUser')!, this.noteBP,Commentaire, this.ville_name, this.activity_type)
    // let newCommentaryObject = new Commentary(this.newBPForm.value.name,  sessionStorage.getItem('currentUser')!,
    // this.noteBP, this.newBPForm.value.commentary, this.ville_name, this.activity_type);
    
    console.log(this.newBPForm.value.commentary)
    console.log("newCommentaryObject"+newCommentaryObject.commentaires)
    
    
    this.http.post('http://localhost:8080/' + this.ville_name + '/' +  this.activity_type + '/' + FileName + '/newbonplan', this.newBP).subscribe(() => {
        this.http.post("http://localhost:8080/commentaries/create/" + this.newBPForm.value.name + "/" + localStorage.getItem('currentUser')!, newCommentaryObject).subscribe(() => {
            this.dialogRefs.closeAll();
            // listBPComponent.ngOnInit();
        })
        })
    
}

public noteClick(note:String) {
    this.noteBP = note
    console.log(this.noteBP)
    this.nouvelleNote = [];
    this.nouvelleNote.push(Number(note));
  }

get f(): { [key: string]: AbstractControl } {
    return this.newBPForm.controls;
  }
}