import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth
  ) { }

  loginWitgGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.auth, provider);
    return from(promise);
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
