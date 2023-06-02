import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../models/models.component';
import { Router } from '@angular/router';
import{GeneralService} from  '../services/general.service';
// import { stringify } from '@angular/compiler/src/util';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {  
  mode :number =0;
  identifiant ="";
  password ="";


  formConnexion = new FormGroup({
    id: new FormControl('', null),
    mdp: new FormControl('', null),
  });
  requestOptions: any;
  headerDict: any;

  constructor(
    private router: Router,
    private service: GeneralService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.service.clearUser();
    // this.identifiant = this.formConnexion.value.id;    
    // this.password = this.formConnexion.value.mdp;
    
  }

  // public getUserForConnexion(user:any): Observable<any> {
  //   const url = `http://localhost:8080/login?login=${login}&mdp=${mdp}`;
  //   //return this.http.get<any>(url);
  //   //return this.service.login(user).subscribe;
  // }

  onGetConnexion() {
    let newUser: User={
      "id": 0,
    "nom": "",
    "prenom": "",
    "identifiant": "",
    "password": "",
    "dateInscription": "",
    "typeUser":"",
    
  }

    newUser.identifiant=this.formConnexion.value.id;
    newUser.password=this.formConnexion.value.mdp;
    
    this.service.login(newUser).subscribe(
      (resp) => {
        let jwt=resp.headers.get('Authorization');
        console.log("jwt : ", jwt);        
          this.service.saveToken(jwt);
          //this.service.redirectAfterAuth();   
        

          //this.service.user$.next({...user});
        
        
      },
      error => {
        this.mode=1;
        console.log("error connexion : ", error);
  });

  //this.getUserByCredentials(identifiant,password);

  }

  private getUserByCredentials(username: string, password: string){
    let newUser: User={
      "id": 0,
    "nom": "",
    "prenom": "",
    "identifiant": "",
    "password": "",
    "dateInscription": "",
    "typeUser":"",
    
  }

    this.service.getUserAfterAuth().subscribe(
      (resp) => {
        //newUser=resp;
        console.log("resp : ", resp);
      },
      error => {
        console.log("error connexion 2 : ", error);
  });
  }

}
