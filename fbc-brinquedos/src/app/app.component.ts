import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FbcHeaderComponent } from "./components/fbc-header/fbc-header.component";
import { FbcMenuComponent } from "./components/fbc-menu/fbc-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FbcHeaderComponent, FbcMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fbc-brinquedos';
}
