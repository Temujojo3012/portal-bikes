import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$!: any;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = user(this.auth)
      .pipe(
        map((user: any) => {
          if (!user) {
            this.router.navigate(['/login'])
          }
        })
      )

      this.user$.subscribe();
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  createUserWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  signOut(): void {
    signOut(this.auth);
  }
}
