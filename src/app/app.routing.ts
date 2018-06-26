import {Routes,RouterModule} from "@angular/router";
import { RestauranteComponent } from "./restaurante/restaurante.component";
import { PratoComponent } from "./prato/prato.component";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./home/home.component";


 const APP_ROUTES: Routes=[
     {path:"",component:HomeComponent},
     {path:"restaurantes",component: RestauranteComponent},
     {path:"pratos",component:PratoComponent}
 ];

 export const routing:ModuleWithProviders=RouterModule.forRoot(APP_ROUTES);