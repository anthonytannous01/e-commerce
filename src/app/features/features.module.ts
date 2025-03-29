import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UserProfileComponent } from './user-profile/user-profile.component'

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FeaturesModule {}
