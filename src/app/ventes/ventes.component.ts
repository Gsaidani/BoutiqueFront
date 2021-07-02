import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vente, Produit, User } from '../models/models.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewVenteModaleComponent } from './new-vente-modale/new-vente-modale.component';
import { ModifyVenteModaleComponent } from './modify-vente-modale/modify-vente-modale.component';
import { GeneralService } from '../services/general.service';
@Component({
  selector: 'app-ventes',
  templateUrl: './ventes.component.html',
  styleUrls: ['./ventes.component.css']
})

export class VentesComponent implements OnInit {
  ventetMatData: MatTableDataSource<Vente> = new MatTableDataSource<Vente>(
    []
  );
  colonnesTableauVentes: string[] = [
    "article",
    "prixArticle",
    "quantite",
    "date",
    "total",
    "modifyVente",
    "deleteVente"
  ];
  ventes = [{}];
  requestOptions: any;
  headerDict: any;
  date: any;
  dateDebut: any;
  dateFin: any;
  newDateLigneVente: any;
  newQuantiteLigneVente: number;
  articleList: any;
  articleChoise: any;
  protected datePipe: DatePipe = new DatePipe('en-US')
 
  userOfnewVenteToAdd: User = { "id": 1,
   "nom": "",
    "prenom": "",
     "identifiant": "",
      "password": "",
       "dateInscription": "",
        "typeUser": ""};

  articleOfnewVenteToAdd: Produit = { 
    "id": 1,
     "designation": "kebab",
      "prixUnitaire": 5,
       user:this.userOfnewVenteToAdd };
  
  dateDebutModel : any;
  dateFinModel : any;
  VenteToCancel: Vente;
  idUser : any;

  formDate = new FormGroup({
    dateDebut: new FormControl('', null),
    dateFin: new FormControl('', null),
  });

  today = new Date();

  animal: string;
  name: string;
  dateToday: string;

  constructor(private http: HttpClient,
    private service: GeneralService,
    private dialog: MatDialog) {
    this.dateToday = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    
  }



  ngOnInit(): void {
    //this.idUser = this.service.getUser();
    this.idUser=1;
    console.log("this.idUser : ", this.idUser);
    //this.date = new FormControl(new Date(), null);
    //dateToday=dateToday.substring(6,10)+"-"+dateToday.substring(3,5)+"-"+dateToday.substring(0,2); 
    
    this.getListOfArticle();
    this.getVentes(this.dateToday, this.dateToday);

  }

  openDialogNewVente(): void {
    const dialogRef = this.dialog.open(NewVenteModaleComponent, {
      width: '500px',
      data: {
        listVente: {
          id: 0, article: Produit,
          quantite: 0, dateVente: "",user:User
        }, listArticles: this.articleList, articleChoisi: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.articleList.forEach(element => {
        if (result.articleChoisi && result.articleChoisi === element.designation && element.id !== 0) {
          result.listVente.article = element;
        }

      });
      result.listVente.dateVente = result.listVente.dateVente.toLocaleString('FR', 'yyyy-MM-dd').split(' ')[0];
      result.listVente.dateVente = result.listVente.dateVente.substring(6, 10) + "-" + result.listVente.dateVente.substring(3, 5) + "-" + result.listVente.dateVente.substring(0, 2);
      this.userOfnewVenteToAdd.id=this.idUser;
      result.listVente.user=this.userOfnewVenteToAdd;

      // this.service.user$.subscribe(user=>{
      //   this.userOfnewVenteToAdd.id=user.id;

      //   result.listVente.user=this.userOfnewVenteToAdd;
      //   console.log("this.service.user$ : ", this.service.user$);
      //   console.log("user : ", user);
      // });

      this.saveNewVente(result.listVente, result.listVente.dateVente);
      //this.getVentes(this.dateToday, this.dateToday);
    
    },
    error => {
        //todo : tost l'erreur
        console.log("error new Vente : ", error);
      });
  }

  




 

  public saveNewVente(vente: Vente, dateVente: String) {
    this.service.saveVente(vente, dateVente).subscribe(
      (ventes: any) => {
        this.ventetMatData.data = ventes.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error Save : ", error);
      }
    );

  }

  public modifySelectedVente(vente: Vente) {
    this.service.modifyVente(vente).subscribe(
      (ventes: any) => {
        this.ventetMatData.data = ventes.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error Modification : ", error);
      }
    );

  }

  public deleteVenteLigne(vente : Vente) {
    
      this.service.deleteVente(vente).subscribe(
        (ventes: any) => {
          this.ventetMatData.data = ventes.content;
        },
        error => {
          //todo : tost l'erreur
          console.log("error delete : ", error);
    });

  }

  

  public getVentes(d1: String, d2: String) {
    //console.log("this.idUser : ", this.idUser);
    this.service.getVentesByDate(this.idUser,d1, d2).subscribe(
      
      (ventes: any) => {
        if(ventes){
          this.ventetMatData.data = ventes.content;
        }
        
      },
      error => {
        //todo : tost l'erreur
        console.log("error 1 : ", error);
      }
    );
  }

  redirectToOriginal() {
    window.location.href = '/ventes';

  }

  modifyArticleNumber(articleNumber : any){}

  onSearchByDate() {

    this.dateDebut = this.formDate.get('dateDebut').value.toLocaleString('FR', 'yyyy-MM-dd').split(' ')[0];
    console.log(this.dateDebut);
    this.dateFin = this.formDate.get('dateFin').value.toLocaleString('FR', 'yyyy-MM-dd').split(' ')[0];
    this.dateDebut = this.dateDebut.substring(6, 10) + "-" + this.dateDebut.substring(3, 5) + "-" + this.dateDebut.substring(0, 2);
    console.log(this.dateDebut);
    this.dateFin = this.dateFin.substring(6, 10) + "-" + this.dateFin.substring(3, 5) + "-" + this.dateFin.substring(0, 2);
    if (!isNullOrUndefined(this.dateDebut) && !isNullOrUndefined(this.dateFin)) {
      this.getVentes(this.dateDebut, this.dateFin)
    }

  }


  getListOfArticle() {
    let idUser=1;
    this.service.getAllArticles(idUser).subscribe(
      (produits: Produit[]) => {
        this.articleList = produits;
      },
      error => {
        //todo : tost l'erreur
        console.log("error 3 : ", error);
      }
    );

  }

  onCanceledVente(vente: Vente) {
    
    this.deleteVenteLigne(vente);
    
  }

  onModifiedVente(vente: Vente) {
    
this.modifySelectedVente(vente);
    
  }


}
