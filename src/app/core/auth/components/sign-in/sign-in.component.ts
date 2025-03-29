import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage: string | null = null;

  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      Username: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.signInForm.valid) {
      const email = this.signInForm.value.Username;
      const password = this.signInForm.value.Password;
  
      this.authService.signIn(email, password).subscribe({
        next: () => {
          console.log('Logged in successfully!');
          this.router.navigate(['/product-listing']); // Navigate to the desired page
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.message || 'An error occurred. Please try again.'; // Display error message
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid email and password.'; // Display form validation error
    }
  }

  onLogin() {
    if (this.signInForm.valid) {
      const email = this.signInForm.value.Username; // Ensure this matches the form control name
      const password = this.signInForm.value.Password; // Ensure this matches the form control name
  
      this.authService.signIn(email, password).subscribe({
        next: () => {
          console.log('Logged in successfully!');
          this.router.navigate(['/product-listing']); // Navigate to the desired page
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Incorrect email or password'; // Display error message
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid email and password.'; // Display form validation error
    }
  }

  askForAdminCode(event: Event): void {
    event.preventDefault();

    const code = prompt('Enter admin code:');

    if (code === 'secretcode') {
      this.router.navigate(['/admin']);
    } else {
      alert('Incorrect code.');
    }
  }

  onEmailKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.passwordInput.nativeElement.focus();
    }
  }

  onPasswordKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.signInButton.nativeElement.click();
    }
  }
}