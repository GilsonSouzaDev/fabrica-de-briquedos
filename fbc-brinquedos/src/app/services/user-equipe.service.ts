import { Injectable } from '@angular/core';
import { UserEquipe } from '../interfaces/user-equipe';
import { USEREQUIPE } from '../data/userequipe';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserEquipeService {
  constructor() {}

  private readonly listaDeMembros: UserEquipe[] = USEREQUIPE;


   getUserEquipe(): Observable<UserEquipe[]> {
      return of(this.listaDeMembros);
    }


}
