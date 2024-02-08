import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  initAuth(): void {
    this.afAuth.user.pipe(map((user) => !!user)).subscribe((res) => {
      this.isLoggedInSubject.next(res);
    });
  }

  signUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        // Sign up successful
        console.log(data);
      })
      .catch((error) => {
        // An error occurred
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error.message);

        // An error occurred
      });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }
}
