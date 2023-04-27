import { Component, Injectable, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { MatDialog } from "@angular/material/dialog";
import { Activite } from "../activite";
import { Bonplan } from "../bonplan";

@Component({
    selector: 'userProfile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['user-profile.component.css'],
  })

@Injectable({
providedIn: 'root'
})
export class UserProfileComponent implements OnInit{

    constructor(private dialog : MatDialog,private router: Router, private route: ActivatedRoute, private http: HttpClient, private appComponent: AppComponent) {}
    userDetails : User;
    user_updated : User;
    username : String;
    msg : String;
    choixdelete : String = "0";
    AllBonPlan : Bonplan[]

   
ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams =>{
        this.username = routeParams['currentUser']
        this.getUserDetails(this.username)
    })
    localStorage.setItem('currentImg', "./assets/img/activite-navbar.jpeg");
    localStorage.setItem('currentVille', "");
    localStorage.setItem('currentActivite', "");
    this.appComponent.ngOnInit();

}

public getUserDetails(username: String) {
this.http.get<User>("http://localhost:8080/" + username + "/Details").subscribe((data) => {
    this.userDetails = data;
    localStorage.setItem('currentUserRole', this.userDetails.role.toString())
    }) 
}

@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
  this.dialog.open(templateRef);
}

public CheckUpdatePassword(username:String){
    const current_password : String = (<HTMLInputElement>document.getElementById("current_password")).value;
    const new_password1 : String = (<HTMLInputElement>document.getElementById("new_password1")).value;
    const new_password2 : String = (<HTMLInputElement>document.getElementById("new_password2")).value;
    if (new_password1.length==0 || new_password2.length == 0 || current_password.length==0){
        return "Impossible de mettre à jour le mot de passe : certains champs sont vides"
    }else if (current_password != this.userDetails.password){
        return "Impossible de mettre à jour le mot de passe : la saisie du mot de passe actuel est incorrecte"
    }else if (new_password1 != new_password2){
        return "Impossible de mettre à jour le mot de passe : les deux saisies du nouveau mot de passe ne sont pas identiques."
    }else {
        return "Le mot de passe a été modifié avec succès !"
    }
}

public UpdatePassword(username: String){
    const new_password : string = (<HTMLInputElement>document.getElementById("new_password1")).value;
    this.msg = this.CheckUpdatePassword(this.username);
    if(this.msg[0]!='I'){
            this.user_updated = new User(this.userDetails.firstName, this.userDetails.lastName,
        this.userDetails.email,new_password, username, this.userDetails.role);
        this.http.put("http://localhost:8080/updatepassword",this.user_updated).subscribe(()=>this.http.get<User>("http://localhost:8080/" + username + "/Details").subscribe((data) => {
            this.userDetails = data;
            localStorage.setItem('currentUserRole', this.userDetails.role.toString())
            }) )
    }
}

public UpdateInfos(username:String){
    let new_firstname : String = (<HTMLInputElement>document.getElementById("new_firstname")).value;
    let new_lastname : String = (<HTMLInputElement>document.getElementById("new_lastname")).value;
    let new_email : String = (<HTMLInputElement>document.getElementById("new_email")).value;
    if(new_firstname==""){
        new_firstname=this.userDetails.firstName
    }
    if(new_lastname==""){
        new_lastname=this.userDetails.lastName
    }
    if(new_email==""){
        new_email=this.userDetails.email
    }
    
    this.user_updated = new User(new_firstname,new_lastname, new_email, this.userDetails.password, username, this.userDetails.role);

    this.http.put("http://localhost:8080/updateinfos", this.user_updated).subscribe(()=>this.http.get<User>("http://localhost:8080/" + username + "/Details").subscribe((data) => {
        this.userDetails = data;
        localStorage.setItem('currentUserRole', this.userDetails.role.toString())
        }) )
}

public ChoixDelete(choix : String){
    this.choixdelete = choix;
}

public DeleteAccount(username:String){
    if (this.choixdelete=="0"){
        console.log('Il manque une option')
    }else if(this.choixdelete=="1"){
        this.http.delete("http://localhost:8080/deleteUser/" + username).subscribe()
        this.AfterAccountDeleted()
    }else if(this.choixdelete=="2"){
        this.http.delete("http://localhost:8080/deleteAccountwithBP/"+username).subscribe() 
        this.http.delete("http://localhost:8080/deleteUser/" + username).subscribe()
        this.AfterAccountDeleted()
    }
}

AfterAccountDeleted() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('token');
    this.router.navigate(['/ville'])
  }



}


