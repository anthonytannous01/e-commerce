import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/auth/services/auth.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup
  profileImageUrl: string = 'assets/profile.png'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      Firstname: [localStorage.getItem('Firstname') || '', Validators.required],
      Lastname: [localStorage.getItem('Lastname') || '', Validators.required],
      Email: [
        localStorage.getItem('Email') || '',
        [Validators.required, Validators.email],
      ],
      Password: [
        localStorage.getItem('Password') || '',
        [Validators.required, Validators.minLength(8)],
      ],
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  onSaveChanges(): void {
    if (this.userProfileForm.valid) {
      const { Firstname, Lastname, Email, Password } =
        this.userProfileForm.value

      localStorage.removeItem('Firstname')
      localStorage.removeItem('Lastname')
      localStorage.removeItem('Email')
      localStorage.removeItem('Password')

      localStorage.setItem('Firstname', Firstname)
      localStorage.setItem('Lastname', Lastname)
      localStorage.setItem('Email', Email)
      localStorage.setItem('Password', Password)

      this.router.navigate(['product-listing'])
    }
  }

  SignOut(): void {
    this.router.navigate(['/sign-in/sign-up'])
    this.authService.signOut()
  }

  get f() {
    return this.userProfileForm.controls
  }
}
