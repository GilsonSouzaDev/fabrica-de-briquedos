import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { FbcUsermenuComponent } from "../fbc-usermenu/fbc-usermenu.component";
import { AuthService } from '../../services-mock/auth.service';
import { UsuarioAdmin } from '../../interfaces/usuario-admin';
import { AuthApiService } from '../../services/auth-api.service';
import { FbcPesquisaComponent } from "../fbc-pesquisa/fbc-pesquisa.component";
import { SearchService } from '../../shared/services/search.service';
import { Subscription } from 'rxjs';
import { Router } from 'express';

@Component({
  selector: 'app-fbc-header',
  imports: [FbcUsermenuComponent, FbcPesquisaComponent],
  templateUrl: './fbc-header.component.html',
  styleUrl: './fbc-header.component.scss',
})
export class FbcHeaderComponent {
  public readonly isLoggedIn: Signal<boolean>;
  public readonly currentUser: Signal<UsuarioAdmin | null>;

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly searchService: SearchService
  ) {
    this.isLoggedIn = this.authApiService.isLoggedIn;
    this.currentUser = this.authApiService.currentUser;
  }

  onSearch(term: string): void {
    console.log(`Header recebeu: "${term}". Enviando para o serviço.`);
      if (!term || !term.trim()) {
        this.searchService.updateSearchTerm('');
        return;
      }

      this.searchService.updateSearchTerm(term);
  }
}
