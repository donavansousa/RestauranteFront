import { Component, OnInit } from '@angular/core';

import {PratoService} from '../Services/prato.service';
import {RestauranteService} from '../Services/restaurante.service';
import {IPrato} from '../Models/prato.interface';
import { IRestaurante } from '../Models/restaurante.interface';

@Component({
  selector: 'app-prato',
  templateUrl: './prato.component.html',
  styleUrls: ['./prato.component.css']
})



export class PratoComponent implements OnInit {

  //formulário
  formLabel: string;
  isEditMode: boolean=false;
  AdicionarOuEditar:boolean=false;
  filtro:string="";
  pratos : IPrato[]=[];
  prato : IPrato =<IPrato>{};
  restaurantes :IRestaurante[]=[];
  constructor(private pratoService:PratoService, private restauranteService:RestauranteService) {
    
    this.formLabel="Cadastro de Prato";

  }

  private ListaPratos(){
    this.pratoService.getPratos().subscribe(
      data=> this.pratos=data,
      error => alert(error),
      ()=>console.log(this.pratos)
      
    );

    
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
    this.ListaPratos();
    this.ListaRestaurantes();
    this.AdicionarOuEditar=false;
  }


  onSubmit(){
    if(this.isEditMode){
      this.pratoService.editPrato(this.prato)
        .subscribe(response=>{
         this.ListaPratos();
         this.formLabel="Cadastro de Prato";
      });
    }else{
    this.pratoService.addPrato(this.prato)
    .subscribe(response=>{
      this.ListaPratos();
    });
  }
  this.AdicionarOuEditar=false;
  }

  cancel(){
    this.formLabel="Cadastro de Prato";
    this.isEditMode=false;
    this.AdicionarOuEditar=false;
 }

 add(){
  this.formLabel="Cadastro de Prato";
   this.isEditMode=false;
   this.prato=<IPrato>{};
   this.AdicionarOuEditar=true;
}

 edit(prato : IPrato){
  this.formLabel="Editar Prato";
   this.isEditMode=true;
   this.prato=prato
   this.AdicionarOuEditar=true;
}

delete(prato :IPrato){
  if(confirm("Tem certeza que deseja excluir este prato?")){
    this.pratoService.deletePrato(prato.IdPrato)
  .subscribe(response=>{
    this.ListaPratos();
  });
 }
 }

 filter(){
  if(this.filtro==""){
    this.ListaPratos();
  }else{
    this.pratoService.getPratosFiltrados(this.filtro)
      .subscribe(response=>{
      this.pratos=response; 
    });
  }
 } 
}
