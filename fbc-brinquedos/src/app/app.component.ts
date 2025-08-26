import { Component } from '@angular/core';
import { FbcHeaderComponent } from "./components/fbc-header/fbc-header.component";
import { FbcMenuComponent } from "./components/fbc-menu/fbc-menu.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [FbcHeaderComponent, FbcMenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fbc-brinquedos';
}
