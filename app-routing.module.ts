import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Pages/signup/signup.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'navbar',
    component:NavbarComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
