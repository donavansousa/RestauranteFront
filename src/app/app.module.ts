import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import {RestauranteService} from './Services/restaurante.service';
import { HttpModule,JsonpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PratoComponent } from './prato/prato.component';
import { PratoService } from './Services/prato.service';
import { NavbarComponent } from './navbar/navbar.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    RestauranteComponent,
    PratoComponent,
    NavbarComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    JsonpModule,
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [RestauranteService,PratoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
