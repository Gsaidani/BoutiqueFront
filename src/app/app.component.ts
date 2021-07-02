import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginSession : any;
  mdpSession : any;
  typeUser : any;
  userIsConnected : boolean;
  userIsAdmin: boolean=false;
  admin ="admin";
  authButton  : boolean=true;

  

  constructor(
    private router: Router,
    public service: GeneralService,
    private http: HttpClient) { }

  ngOnInit(): void {

    // this.loginSession = localStorage.getItem("user.");
    // this.mdpSession = localStorage.getItem("mdp");
    // this.typeUser = localStorage.getItem("typeUser");
    if(this.service.getUserRole()){
      this.userIsConnected=true;

    }
    if(this.service.getUserRole()==="admin"){
      //console.log("role : ",localStorage.getItem("role")[0]);
      this.userIsConnected=true;
      this.userIsAdmin=true;
      const items = this.service.user$.value;
      items.connected=true;
      items.typeUser="admin";
      items.prenom="ghassen";
      items.nom="saidani";
      
      // items[index].onClick = 'fn';
       this.service.user$.next({...items});
       console.log("observable : ", items);

    }

    // if(this.service.user$.type==this.admin){
    //   this.userIsAdmin=true;

    // }
    // if(window.location.href !== '/login'){
    //   this.userIsConnected=true;
    // }
   
  }

  ngOnChange(){
   // this.loginSession = localStorage.getItem("user.");
    // this.mdpSession = localStorage.getItem("mdp");
    // this.typeUser = localStorage.getItem("typeUser");
    if(this.service.getUserRole()){
      this.userIsConnected=true;

    }
    if(this.service.getUserRole()==="admin"){
      //console.log("role : ",localStorage.getItem("role")[0]);
      this.userIsConnected=true;
      this.userIsAdmin=true;
      const items = this.service.user$.value;
      items.connected=true;
      items.typeUser="admin";
      items.prenom="ghassen";
      items.nom="saidani";
      
      // items[index].onClick = 'fn';
       this.service.user$.next({...items});
       console.log("observable : ", items);

    }

    // if(this.service.user$.type==this.admin){
    //   this.userIsAdmin=true;

    // }
    // if(window.location.href !== '/login'){
    //   this.userIsConnected=true;
    // }
  }
  
  onDeconnectUser(){
    this.service.logout();
    this.userIsConnected=false;
    this.userIsAdmin=false;
      // localStorage.removeItem("login");
      // localStorage.removeItem("mdp");
      // localStorage.removeItem("typeUser");
      // localStorage.removeItem("id");
      // this.userIsConnected=false;
      //this.router.navigate(['/']);

  }


  
  
}
