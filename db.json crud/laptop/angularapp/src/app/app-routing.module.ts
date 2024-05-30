import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopListComponent } from './laptop-list/laptop-list.component';
import { AddLaptopComponent } from './add-laptop/add-laptop.component';

const routes: Routes = [
  { path: '', redirectTo: '/laptops', pathMatch: 'full' },
  { path: 'laptops', component: LaptopListComponent },
  { path: 'add', component: AddLaptopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
