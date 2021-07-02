import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Produit, User } from '../models/models.component';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewProduitModaleComponent } from './new-produit-modale/new-produit-modale.component';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  

  produitMatData: MatTableDataSource<Produit> = new MatTableDataSource<Produit>(
    []
  );
  colonnesTableauProduits: string[] = [
      "designation",
      "prixUnitaire",
      "modifyProduit",
      "deleteProduit"

  ];
  headerDict: any;
  requestOptions: any;
  articleList: any;
  actualUserId : any;
  constructor(private http: HttpClient,
    private service: GeneralService,
    private dialog: MatDialog,
    protected toaster: ToastrService) { }

  ngOnInit(): void {
    this.actualUserId = this.service.getUser(null,null);
  
    this.getListOfArticle(this.actualUserId);
  }

  getListOfArticle(idUser : number) {
    this.service.getAllArticles(idUser).subscribe(
      (produits: any) => {
        this.produitMatData.data = produits.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error 3 : ", error);
      }
    );

  }
  
  public modifyPrixUnitaire(produit: Produit) {
    this.service.modifyProduit(produit).subscribe(
      (produits: any) => {
        this.produitMatData.data = produits.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error Modification : ", error);
      }
    );

  }
  

  public deleteProduitLigne(produit: Produit) {
    
    this.service.deleteProduit(produit).subscribe(
      (produits: any) => {
        this.produitMatData.data = produits.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error delete : ", error);
      }
    );

}

  onCanceledProduit(produit: Produit){
    console.log("produit to cancel : ", produit);
    
    if(produit){
      this.service.getAllVentesByArticle(produit.id).subscribe(
        (number) => {
          console.log("number : ", number);
          if(number && number>0){
            this.toaster.warning(
              "Ce produit est relié à "+ number+ " vente(s) !"
            );
          } else {
            this.deleteProduitLigne(produit);
          }
          
        },
        error => {
          //todo : tost l'erreur
          console.log("error 4 : ", error);
        }
      );
      
    }
    
   


  }

  onModifiedProduit(produit: Produit){
    this.modifyPrixUnitaire(produit);
  }

  openDialogNewProduit(): void {
    let newArticle : Produit={id:0,designation:"",prixUnitaire:0, user:{
      id: 0,
      nom: "",
      prenom: "",
      identifiant: "",
      password: "",
      dateInscription: "",
      typeUser:""}};
    
    const dialogRef = this.dialog.open(NewProduitModaleComponent, {
      width: '500px',
      data: {
        article: {id:0,designation:"",prixUnitaire:0},
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result : ", result);
      newArticle.prixUnitaire=result.prixUnitaire;
      newArticle.designation=result.designation;
      newArticle.user.id=this.actualUserId;
      console.log("newArticle : ", newArticle);
      this.saveNewProduit(newArticle);
      
    });
  }

  


  public saveNewProduit(produit: Produit) {
    this.service.saveProduit(produit).subscribe(
      (produits: any) => {
       
        this.produitMatData.data = produits.content;
      },
      error => {
        //todo : tost l'erreur
        console.log("error add : ", error);
      }
    );

  }


}
