import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  public form!: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private auth: Auth = inject(Auth);

  ngOnInit(): void {
    this.buildForm();
    user(this.auth).pipe(
      map((data: any) => {
        if (data) {
          this.router.navigate(['/']);
          return true
        } else {
          return false
        }
      })
    ).subscribe()
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  public signUp(): void {
    const formValues = this.form.value;
    this.authService.createUserWithEmailAndPassword(formValues.email, formValues.password);
  }

  public logIn(): void {
    const formValues = this.form.value
    this.authService.signInWithEmailAndPassword(formValues.email, formValues.password)
      .pipe(
        map((user: any) => {
          if (user) {
            this.router.navigate(['/'])
            return true;
          } else {
            return false
          }
        })
      ).subscribe()
  }
}

