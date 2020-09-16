import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User, Type } from '../models/models.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NewUserModaleComponent } from './new-user-modale/new-user-modale.component';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userMatData: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  colonnesTableauUser: string[] = [
    "nom",
    "prenom",
    "identifiant",
    "password",
    "dateInscription",
    "typeUser",
    "modifyUser",
    "deleteUser"


  ];
  headerDict: any;
  requestOptions: any;
  motCle: any;
  motCleForDelete: any;
  
  constructor(private http: HttpClient,
    private service: GeneralService,
    private dialog: MatDialog,
    protected toaster: ToastrService) { }

  ngOnInit(): void {
    
  }



  

  public onSearchByMC(mc) {

    if(mc){
      this.motCleForDelete=mc;
      this.service.getUserByMC(mc).subscribe(
        (user: User[]) => {
         
          this.userMatData.data = user.content;
          
          this.motCle=null;
        },
        error => {
          //todo : tost l'erreur
          console.log("error Modification : ", error);
        }
      );
  
    }
    
  }
  
 

  public deleteUserLigne(user: User) {
    
    this.service.deleteUser(user).subscribe(
      (user: User[]) => {
         
        //this.userMatData.data = user;
        if(this.motCleForDelete){
          this.onSearchByMC(this.motCleForDelete);
        }
        //this.onSearchByMC();
        
      },
        
      
      error => {
        //todo : tost l'erreur
        console.log("error delete : ", error);
      }
    );

    

}

  onCanceledUser(user: User){
    console.log("produit to cancel : ", User);
    
    if(user){
      this.service.getAllProductByUser(user.id).subscribe(
        (number) => {
          console.log("number : ", number);
          if(number && number>0){
            this.toaster.warning(
              "Ce produit est relié à "+ number+ " vente(s) !"
            );
          } else {
            this.deleteUserLigne(user);
          }
          
        },
        error => {
          //todo : tost l'erreur
          console.log("error 4 : ", error);
        }
      );
      
    }

  }

  onModifiedUser(user: User) {
    this.service.modifyUser(user);
  }

  openDialogNewUser(): void {
    let newUser: User = { 
      id: 0, 
      nom: "", 
      prenom: "",
      identifiant: "",
      password: "",
      dateInscription: "",
      typeUser: "",
      connected: false };
    
  

    const dialogRef = this.dialog.open(NewUserModaleComponent, {
      width: '500px',
      data: {
        user: {id: 0, 
          nom: "", 
          prenom: "",
          identifiant: "",
          password: "",
          dateInscription: "",
          typeUser: "",
          connected: false },
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result.user.dateInscription = result.user.dateInscription.toLocaleString('FR', 'yyyy-MM-dd').split(' ')[0];
      result.user.dateInscription = result.user.dateInscription.substring(6, 10) + "-" + result.user.dateInscription.substring(3, 5) + "-" + result.user.dateInscription.substring(0, 2);
      //result.user.typeUser=result.user.typeUser;
      console.log("result : ", result);
      newUser=result.user;  
      console.log("newUser : ", newUser);
       
       this.service.saveNewUser(newUser).subscribe(
        (users: User[]) => {         
          
          this.userMatData.data = users;
          
          this.service.getUserByMC(newUser.nom).subscribe(
            (user: User[]) => {
              
              this.userMatData.data = user.content;
            
            },
            error => {
              //todo : tost l'erreur
              console.log("error Modification : ", error);
            }
          );
        },
        error => {
          //todo : tost l'erreur
          console.log("error delete : ", error);
        }
      );
      

    });
  }

}
