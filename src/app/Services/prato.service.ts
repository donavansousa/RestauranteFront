import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPrato } from '../Models/prato.interface';


@Injectable()
export class PratoService{

    constructor (private http: Http){}

    //Lista Pratos
    getPratos(){
        return this.http.get("http://localhost:58287/api/prato/GetPratos").map(data=> <IPrato[]>data.json());

    }
    
    //Lista Pratos de acordo com o filtro
    getPratosFiltrados(filtro: string){
        return this.http.get(`http://localhost:58287/api/prato/GetFilterPratos?filtro=${filtro}`).map(data=> <IPrato[]>data.json());

    }

    //Adiciona Prato
    addPrato(prato: IPrato){
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });       
        let body =  this.serializeObj(prato);
        return  this.http.post("http://localhost:58287/api/prato/PostPrato",body,options).map((res: Response) => res.json());
    }

    //Edita Prato
    editPrato(prato: IPrato) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });       
        let body =  this.serializeObj(prato);
        return  this.http.put(`http://localhost:58287/api/prato/PutPrato/${prato.IdPrato}`,body,options).map((res: Response) => res.json());
    }

    //Remove Prato
    deletePrato( pratoId:number) : Observable<any>{
        return  this.http.delete(`http://localhost:58287/api/prato/DeletePrato/${pratoId}`).map((res: Response) => res.json());
    }

    //Serializa Objeto
    private serializeObj(obj) {
        var result = [];
        for (var property in obj){
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
        }
        return result.join("&");
    }
}