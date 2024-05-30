import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LaptopListComponent } from './laptop-list/laptop-list.component';
// import { AddLaptopComponent } from './add-laptop/add-laptop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddLaptopComponent } from './add-laptop/add-laptop.component';
import { LaptopListComponent } from './laptop-list/laptop-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LaptopListComponent,
    AddLaptopComponent,
    AddLaptopComponent,
    LaptopListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
