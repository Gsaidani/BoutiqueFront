import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Type, Vente, Produit } from '../models/models.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private jwtToken:any;
  private roles : Array<any>; 
  private requestOptions: any;
  private headerDict: any;
  private host:string ="http://localhost:8080";
  
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    id: 0,
    nom: "",
    prenom: "",
    identifiant: "",
    password: "",
    dateInscription: "",
    typeUser : "",
    connected : false
});

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService) { }

    ngOnInit(): void {
      
    // this.headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    // }
    // this.requestOptions = {
    //   headers: new Headers(this.headerDict),
    // };
    // this.requestOptions = {
    //   headers: new HttpHeaders({'Authorization':this.jwtToken})
    //  };
    
  }



public getUserByMC(mot: string): Observable<any> {
  const url = this.host+`/user/byMC?mot=${mot}`;
  return this.http.get<any>(url,this.requestOptions);
  
}

public getUser(username: string, password: string): Observable<any> {
  const url = this.host+`/user?username=${username}&password=${password}`;
  return this.http.get<any>(url,this.requestOptions);
  
}

public getUserAfterAuth(): Observable<any> {
  const url = this.host+`/userAA`;
  return this.http.get<any>(url,this.requestOptions);
  
}


public saveNewUser(user: User): Observable<any> {
  const url = this.host+`/user/save`;
  return this.http.post(url, user, this.requestOptions);
}

public deleteUser(user: User): Observable<any> {
  const url = this.host+`/user/delete/${user.id}`;
  return this.http.delete(url, this.requestOptions,[]);
}

public modifyUser(user: User): Observable<any> {
  const url = this.host+`/user/modify/${user.id}`;
  return this.http.put(url, user, this.requestOptions);
}

public getAllProductByUser(idUser : number): Observable<any> {
  const url = this.host+`/produit/byUser?idUser=${idUser}`;
  return this.http.get<any>(url,this.requestOptions);
  //return this.http.get<any>("http://localhost:8080/ventesByArticle?produit=${article}");
}

public getAllArticles(idUser: number): Observable<any> {
  
  idUser=1;
    const url = this.host+`/produit?idUser=${idUser}`;
    return this.http.get<any>(url,this.requestOptions);
    
  }
  public getVentesByDate(idUser: number,d1: String, d2: String): Observable<any> {
    const url = this.host+`/vente/byDate?debut=${d1}&fin=${d2}&idUser=${idUser}`;
    return this.http.get<any>(url,this.requestOptions);
  }

  public getAllVentes(): Observable<any> {
    const url = this.host+`/vente`;
    return this.http.get<any>(url,this.requestOptions);
  }


  public saveVente(vente: Vente, dateVente: String): Observable<any> {
    const url = this.host+`/vente/save?dateVente=${dateVente}`;
    return this.http.post(url, vente, this.requestOptions);
  }

  public modifyVente(vente: Vente): Observable<any> {
    const url = this.host+`vente/modify/${vente.id}`;
    return this.http.put(url, vente, this.requestOptions);
  }

  public deleteVente(vente: Vente): Observable<any> {
  
    const url = this.host+`vente/delete/${vente.id}`;
    return this.http.delete(url,this.requestOptions,[]);
  }

  public saveProduit(produit: Produit): Observable<any> {
    const url = this.host+`/produit/save`;
    return this.http.post(url, produit, this.requestOptions);
  }

  public getAllVentesByArticle(idArticle : number): Observable<any> {
    const url = this.host+`:vente/byArticle?idArticle=${idArticle}`;
    return this.http.get<any>(url,this.requestOptions);
    //return this.http.get<any>("http://localhost:8080/ventesByArticle?produit=${article}");
  }

  public modifyProduit(produit: Produit): Observable<any> {
    const url = this.host+`produit/modify/${produit.id}`;
    return this.http.put(url, produit, this.requestOptions);
  }

  public deleteProduit(produit: Produit): Observable<any> {
    const url = this.host+`produit/delete/${produit.id}?idUser=${produit.user.id}`;
    return this.http.delete(url,this.requestOptions,[]);
  }





  /////////////////////Authentification///////////////
  loadToken(){
    this.jwtToken=localStorage.getItem('token');
    
  }

  login(user: User) {
    console.log('Tentative de connexion');
   this.requestOptions = {
      headers: new HttpHeaders({'Authorization':this.jwtToken})
     };
    return this.http.post(this.host+"/login",user,{observe:'response'});
    
/*
    // Ajout des roles au modèle utilisateur
  let rolesUser = [];
  if(user){
  if (user.typeUser === 'admin') {
    rolesUser = ['admin'];
  }else{
    rolesUser = ['client'];
  }
}

  this.setUser(user, rolesUser);

    // On récupère l'url de redirection
    const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';

    // On accède à la page souhaitée
    this.router.navigate([redirectUrl]);
    */
  }

  redirectAfterAuth(){
// On récupère l'url de redirection
const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/home';

// On accède à la page souhaitée
this.router.navigate(['/home']);
  }

  getDecodedAccessToken(token: string): any {
    try{
       // return jwt_decode(token);
       return this.jwtHelper.decodeToken(token);
    }
    catch(Error){
        return null;
    }
  }

  saveToken(jwt : string){
    if(jwt){
      localStorage.setItem("token",jwt);
      this.loadToken();
      this.redirectAfterAuth();
    }
    
    // let jwtHelper = new JwtHelperService();
    // let decodedToken = jwtHelper.decodeToken(this.jwtToken)
    // let decodedTokenId = jwtHelper.decodeToken(this.jwtToken);
    // let decodedTokenRoles = jwtHelper.decodeToken(this.jwtToken);
    // let expirationDate = jwtHelper.getTokenExpirationDate(this.jwtToken);
    // let isExpired = jwtHelper.isTokenExpired(this.jwtToken);
    

  }

  

  hasAnyRole(role: string) {
    const userRole = this.getUserRole();
    
  if(userRole && userRole[0]===role){
    console.log("role 2: ", userRole[0]);
    return true;
  }
    
    return false;
  }

  logout() {
    console.log('Tentative de déconnexion');

    this.clearUser();
    this.router.navigate(['/login']);
  }

  // getUser() {
  //   //return JSON.parse(localStorage.getItem('user'));
  //   return "1";
  // }
  getUserRole() {
    
    let decodedToken = this.getDecodedAccessToken(this.jwtToken);
    console.log("token : ", decodedToken);
    //return JSON.parse(decodedToken.roles[0].authority);
    return decodedToken.roles[0].authority;
  }

  setUser(user: User,rolesUser:any) {
    console.log('user', JSON.stringify(user));
    console.log('role', JSON.stringify(rolesUser));

    localStorage.setItem('user', JSON.stringify(user.id));
    localStorage.setItem('role', JSON.stringify(rolesUser));   

  }

  clearUser() {
    this.jwtToken=null;
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }

}
