import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PlaygroundComponent } from './playground/playground.component';
import { OneTimePasswordComponent } from './otp-form/one-time-password/one-time-password.component';
import { OtpFormComponent } from './otp-form/otp-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent
  // we need to add second <router-outlet></router-outlet> to handle children paths
  //children: [
    // {
    //   path: 'child-a', // child route path
    //   component: ChildAComponent, // child route component that the router renders
    // },
    // {
    //   path: 'child-b',
    //   component: ChildBComponent, // another child route component that the router renders
    // },
  },
  { path: 'otp', component: OtpFormComponent},
  { path: 'playground', component: PlaygroundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
