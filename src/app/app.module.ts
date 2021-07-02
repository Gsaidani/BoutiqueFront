import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AchatsComponent } from './achats/achats.component';
import { VentesComponent } from './ventes/ventes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VentesTableComponent } from './ventes/ventes-table/ventes-table.component';
import { AchatsTableComponent } from './achats/achats-table/achats-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProduitsComponent } from './produits/produits.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProduitsTableComponent } from './produits/produits-table/produits-table.component';
import {MatSelectModule} from '@angular/material/select';
import { NewVenteModaleComponent } from './ventes/new-vente-modale/new-vente-modale.component';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from './toolsComponents/confirmation-popup/confirmation-popup.component';
import { ModifyVenteModaleComponent } from './ventes/modify-vente-modale/modify-vente-modale.component';
import { ModifyProduitModaleComponent } from './produits/modify-produit-modale/modify-produit-modale.component';
import { NewProduitModaleComponent } from './produits/new-produit-modale/new-produit-modale.component';
import { UserComponent } from './user/user.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UserTableComponent } from './user/user-table/user-table.component';
import { NewUserModaleComponent } from './user/new-user-modale/new-user-modale.component';
import { ModifyUserModaleComponent } from './user/modify-user-modale/modify-user-modale.component';
import { AuthGuard } from './services/auth/auth.guard';
import { GeneralService } from './services/general.service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: ConnexionComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: AppComponent
  },
  {
    path: 'produits',
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: ':home',
    //     component: AppComponent,
    //   },
    // ],
    component: ProduitsComponent
  },
  {
    path: 'ventes',
    canActivate: [AuthGuard],
    component: VentesComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
    data: {
      roles: ['admin']
    }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AchatsComponent,
    VentesComponent,
    VentesTableComponent,
    AchatsTableComponent,
    ProduitsComponent,
    ProduitsTableComponent,
    NewVenteModaleComponent,
    ConfirmationPopupComponent,
    ModifyVenteModaleComponent,
    ModifyProduitModaleComponent,
    NewProduitModaleComponent,
    ConnexionComponent,
    UserComponent,
    UserTableComponent,
    NewUserModaleComponent,
    ModifyUserModaleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{useHash : true}),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    JwtModule  
  ],
  providers: [GeneralService,AuthGuard,
    {
    provide: MatDialogRef,
    useValue: {}
  }, 
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationPopupComponent]
})
export class AppModule { }
