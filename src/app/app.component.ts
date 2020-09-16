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
    private service: GeneralService,
    private http: HttpClient) { }

  ngOnInit(): void {

    // this.loginSession = localStorage.getItem("user.");
    // this.mdpSession = localStorage.getItem("mdp");
    // this.typeUser = localStorage.getItem("typeUser");
    if(this.service.getUser()){
      this.userIsConnected=true;

    }
    if(this.service.hasAnyRole("admin")){
      //console.log("role : ",localStorage.getItem("role")[0]);
      this.userIsAdmin=true;

    }

    // if(this.service.user$.type==this.admin){
    //   this.userIsAdmin=true;

    // }
    // if(window.location.href !== '/login'){
    //   this.userIsConnected=true;
    // }
   
  }

  ngOnChange(){
    // if(window.location.href !== '/login'){
    //   this.userIsConnected=true;
    // }

    if(this.service.getUser()){
      this.userIsConnected=true;

    }
    if(this.service.hasAnyRole("admin")){
      console.log("role : ",localStorage.getItem("role")[0]);
      this.userIsAdmin=true;

    }
  }
  
  onDeconnectUser(){
    this.service.logout();
    this.userIsConnected=false;
      // localStorage.removeItem("login");
      // localStorage.removeItem("mdp");
      // localStorage.removeItem("typeUser");
      // localStorage.removeItem("id");
      // this.userIsConnected=false;
      //this.router.navigate(['/']);

  }


  
  
}
