import { Component, Injectable, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { User } from "../User";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../app.component";
import { MatDialog } from "@angular/material/dialog";

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
    username : String;
    msg : String;

   
ngOnInit(): void {
    console.log("test on init");
    const routeParams = this.route.snapshot.params;
    this.route.params.subscribe(routeParams =>{
        this.username = routeParams['currentUser']
        this.getUserDetails(this.username)
    })
    this.appComponent.ngOnInit();
}

public getUserDetails(username: String) {
this.http.get<User>("http://localhost:8080/" + username + "/Details").subscribe((data) => {
    this.userDetails = data;
    localStorage.setItem('currentUserRole', this.userDetails.role.toString())
    }) 
    console.log("test 2 on init");
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
        return "La saisie du mot de passe actuel est incorrecte"
    }else if (new_password1 != new_password2){
        return "Impossible de mettre à jour le mot de passe : les deux saisies du nouveau mot de passe ne sont pas identiques."
    }else {
        return "Le mot de passe a été modifié avec succès !"
    }
}

public UpdatePassword(username: String){
    const new_password : String = (<HTMLInputElement>document.getElementById("new_password1")).value;
    this.msg = this.CheckUpdatePassword(this.username);

}


}


