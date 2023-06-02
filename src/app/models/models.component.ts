export class Vente {
  id: number;
  article: Produit;
  quantite: number;
  dateVente: string;
  
}

export class Produit {
  id: number;
  designation: string;
  prixUnitaire: number;
  user : User;
}

export class User {
  id: number;
  nom: string;
  prenom: string;
  identifiant: string;
  password: string;
  dateInscription: string;
  typeUser:string;
  connected?:boolean;

}
export enum Type {
  admin,
  client
}

