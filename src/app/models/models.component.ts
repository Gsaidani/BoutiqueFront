export declare class Vente {
  id: number;
  article: Produit;
  quantite: number;
  dateVente: string;
  
}

export declare class Produit {
  id: number;
  designation: string;
  prixUnitaire: number;
  user : User;
}

export declare class User {
  id: number;
  nom: string;
  prenom: string;
  identifiant: string;
  password: string;
  dateInscription: string;
  typeUser:string;
  connected?:boolean;

}
export declare enum Type {
  admin,
  client
}

