import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from "@angular/router";
import { MatRippleModule } from '@angular/material/core';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatRippleModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(
    private authService: AuthService
  ) { }

  signOut(): void {
    this.authService.signOut();
  }
}
