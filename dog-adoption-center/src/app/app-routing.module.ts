import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './feature/dogs/details/details.component';
import { DogsListComponent } from './feature/dogs/dogs-list/dogs-list.component';
import { HomeComponent } from './feature/pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'breeds', component: DogsListComponent},
  {path: 'details/:id', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
