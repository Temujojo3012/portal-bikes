import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from "./shared/footer/footer";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private router: Router = inject(Router);

  notShowHeader(): boolean {
    if (
      this.router.url === '/login'
    ) {
      return false;
    } else {
      return true
    }
  }
}
