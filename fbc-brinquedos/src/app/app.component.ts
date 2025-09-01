import { Component } from '@angular/core';
import { FbcHeaderComponent } from "./components/fbc-header/fbc-header.component";
import { FbcMenuComponent } from "./components/fbc-menu/fbc-menu.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FbcFooterComponent } from "./components/fbc-footer/fbc-footer.component";


@Component({
  selector: 'app-root',
  imports: [FbcHeaderComponent, FbcMenuComponent, RouterOutlet, CommonModule, FbcFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fbc-brinquedos';



}
