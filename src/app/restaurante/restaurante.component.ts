import { Component, OnInit } from '@angular/core';

import {RestauranteService} from '../Services/restaurante.service';
import {IRestaurante} from '../Models/restaurante.interface';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  restaurantes : IRestaurante[]=[];
  restaurante : IRestaurante =<IRestaurante>{};


  //formulário
  filtro :string ="";
  AdicionarOuEditar:boolean=false;
  formLabel: string;
  isEditMode: boolean;
  constructor(private restauranteService:RestauranteService) {
    this.formLabel="Cadastro de Restaurante";
   }

  private ListaRestaurantes(){
      this.restauranteService.getRestaurantes().subscribe(
        data=> this.restaurantes=data,
        error => alert(error),
        ()=>console.log(this.restaurantes)
        
      );
     this.AdicionarOuEditar=false;
  }
  ngOnInit() {
    this.isEditMode=false;
    this.ListaRestaurantes();
  }
  
  onSubmit(){
   
    if(this.isEditMode){
      this.restauranteService.editRestaurante(this.restaurante)
        .subscribe(response=>{
         this.ListaRestaurantes();
      });
    }else{
      this.restauranteService.addRestaurante(this.restaurante)
      .subscribe(response=>{
        this.ListaRestaurantes();
    });
  }
  this.AdicionarOuEditar=false;
  }


  cancel(){
     this.formLabel="Cadastro de Restaurante";
     this.isEditMode=false;
     this.AdicionarOuEditar=false;
  }

  add(){
    this.formLabel="Cadastro de Restaurante";
     this.isEditMode=false;
     this.restaurante=<IRestaurante>{};
     this.AdicionarOuEditar=true;
  }

  edit(restaurante : IRestaurante){
    this.formLabel="Editar Restaurante";
     this.isEditMode=true;
     this.restaurante=restaurante;
     this.AdicionarOuEditar=true;
  }

  delete(restaurante :IRestaurante){
    if(confirm("Tem certeza que deseja excluir este restaurante?")){
      this.restauranteService.deleteRestaurante(restaurante.IdRestaurante)
    .subscribe(response=>{
      this.ListaRestaurantes();
    });
  }
}

filter(){
  if(this.filtro==""){
    this.ListaRestaurantes();
  }else{
  this.restauranteService.getRestaurantesFiltrados(this.filtro)
    .subscribe(response=>{
    this.restaurantes=response; 
  });
  }
}
}
