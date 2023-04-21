import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'board', component: BoardComponent, data: { animation: 'toggleBoard' }
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
  { path: 'playground', component: PlaygroundComponent, data: { animation: 'togglePlayground' } },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
