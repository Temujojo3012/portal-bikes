import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(
    private router: Router
  ) { }

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
