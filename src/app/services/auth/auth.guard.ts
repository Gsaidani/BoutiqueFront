import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull } from 'util';
import { GeneralService } from '../general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: GeneralService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Récupération de l'utilisateur connecté
    const isLoggedIn = !isNull(localStorage.getItem('token'));

    if (!isLoggedIn) {
      // Si pas d'utilisateur connecté : redirection vers la page de login
      console.log('Vous n\'êtes pas connectés');
      this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
    }
    const roles = next.data['role'];
    let hasRoles = true;
    //if (roles)
     if(true){
      //hasRoles = this.service.hasAnyRole(roles);
      hasRoles=true;
    }
    if (/*!hasRoles*/false) {
      // Si l'utilisateur na pas les habilitations : redirection vers la page d'accueil
      console.log('Vous n\'avez pas les droits');
      this.router.navigate(['/home']);
    }

    return isLoggedIn && hasRoles;
  }

}
