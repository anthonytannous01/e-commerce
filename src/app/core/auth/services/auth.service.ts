import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  // Sign up with email/password
  signUp(email: string, password: string, firstName: string, lastName: string): Observable<void> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Save user details in localStorage
        localStorage.setItem('Firstname', firstName);
        localStorage.setItem('Lastname', lastName);
        localStorage.setItem('Email', email);
        localStorage.setItem('Password', password);
      })
    ).pipe(
      catchError((error) => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        // Save user details in localStorage
        localStorage.setItem('Email', email);
        localStorage.setItem('Password', password);
  
        // Return the user credentials
        return {
          Login: {
            AccessToken: userCredential.user?.refreshToken || '',
            RefreshToken: userCredential.user?.refreshToken || '',
          },
        };
      }).catch((error) => {
        // Handle specific Firebase errors
        let message = 'An error occurred. Please try again.';
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
          message = 'Incorrect email or password.';
        } else if (error.code === 'auth/user-not-found') {
          message = 'User not found. Please check your email.';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Invalid email format.';
        }
        throw new Error(message); // Throw an error with the message
      })
    );
  }

  // Sign out
  signOut(): Observable<void> {
    return from(
      this.afAuth.signOut().then(() => {
        // Clear localStorage
        localStorage.removeItem('Firstname');
        localStorage.removeItem('Lastname');
        localStorage.removeItem('Email');
        localStorage.removeItem('Password');
        this.router.navigate(['/sign-in/sign-up']);
      })
    ).pipe(
      catchError((error) => {
        console.error('Logout error:', error);
        throw error;
      })
    );
  }

  // Check if the user is signed in
  isSignedIn(): Observable<boolean> {
    return new Observable((observer) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}