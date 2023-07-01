import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Pages/signup/signup.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { AdminGuard } from './service/admin.guard';
import { NormalGuard } from './service/normal.guard';
import { ProfileComponent } from './Pages/profile/profile.component';


import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AddCategoryComponent } from './Pages/admin/add-category/add-category.component';
import { ViewQuizesComponent } from './Pages/admin/view-quizes/view-quizes.component';
import { ViewCategoryComponent } from './Pages/admin/view-category/view-category.component';
import { AddQuizesComponent } from './Pages/admin/add-quizes/add-quizes.component';
import { UpdateQuizComponent } from './Pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionComponent } from './Pages/admin/view-question/view-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],

    children: [{
      path: 'profile',
      component: ProfileComponent
    },
    {
      path:'',
      component:WelcomeComponent
    },
    {
      path:"categories",
      component:ViewCategoryComponent
    },
    {
      path:'add-category',
      component:AddCategoryComponent
    },
    {
      path:'view-quiz',
      component:ViewQuizesComponent
    },
    {
      path:'add-quiz',
      component:AddQuizesComponent
    },
    {
      path:'update-quiz/:qid',
      component:UpdateQuizComponent
    },
    {
      path:'view-question/:qid/:title',
      component:ViewQuestionComponent
    },
    {
      path:'add-ques/:qid/:title',
      component:AddQuestionComponent
    }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'user-profile',
        component:UserprofileComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent
      }
    ]

  },
  {
    path:'start/:qid',
    component:StartComponent,
    canActivate: [NormalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
