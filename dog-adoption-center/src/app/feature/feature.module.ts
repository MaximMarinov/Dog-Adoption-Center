import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DogsListComponent } from './dogs/dogs-list/dogs-list.component';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './dogs/details/details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    HomeComponent,
    DogsListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    HomeComponent,
    DogsListComponent,
    DetailsComponent
  ]
})
export class FeatureModule { }
