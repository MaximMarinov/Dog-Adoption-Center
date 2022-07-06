import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './feature/dogs/details/details.component';
import { DogsListComponent } from './feature/dogs/dogs-list/dogs-list.component';
import { HomeComponent } from './feature/pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'breeds', canActivate:[AuthGuard], component: DogsListComponent},
  {path: 'details/:id', canActivate:[AuthGuard], component: DetailsComponent},
  {path: 'register', canActivate:[LoggedGuard], component: RegisterComponent},
  {path: 'login', canActivate:[LoggedGuard], component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
