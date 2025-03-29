import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignInComponent } from './sign-in.component'

const routes: Routes = [
  { path: '', component: SignInComponent },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('../sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}
