import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators} from '@angular/forms'; 
import { Bonplan } from "../bonplan";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-pop-up-DeleteAct',
    templateUrl: './popupDeleteAct.component.html'
  })

  export class PopUpComponentDeleteAct implements OnInit{

    ngOnInit(): void {
        
    }
    
  }