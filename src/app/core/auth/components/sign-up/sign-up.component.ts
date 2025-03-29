import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  errorMessage: string | null = null;

  @ViewChild('lastnameInput') lastnameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('signUpButton') signUpButton!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const firstName = this.signUpForm.value.Firstname;
      const lastName = this.signUpForm.value.Lastname;
      const email = this.signUpForm.value.Email;
      const password = this.signUpForm.value.Password;

      // Use AuthService to sign up
      this.authService.signUp(email, password, firstName, lastName).subscribe({
        next: () => {
          console.log('Signed up successfully!');
          this.router.navigate(['/product-listing']); // Navigate to the desired page
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = 'Error during signup. Please try again.'; // Display error message
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.'; // Display form validation error
    }
  }

  onKeydown(event: KeyboardEvent, nextInput: HTMLInputElement) {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextInput.focus();
    }
  }

  onLastKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.signUpButton.nativeElement.click();
    }
  }
}