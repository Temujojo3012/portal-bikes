import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  public form!: FormGroup;

  //Todo: Mover la comprovacion del login al componente principal
  user$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.user$ = user(this.auth)

    this.user$.pipe(
      map((data: any) => {
        if (data) {
          //this.router.navigate(['/']);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    ).subscribe(
      {
        next: (data: any) => {
          console.log(data)
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log()
        }
      }
    )
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  public signUp(): void {
    createUserWithEmailAndPassword(this.auth, this.form.controls['username'].value, this.form.controls['password'].value)
  }

  public logIn(): void {
    signInWithEmailAndPassword(this.auth, this.form.controls['username'].value, this.form.controls['password'].value)
  }

  public logOut() {
    signOut(this.auth)
  }
}

