import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {IRestaurante} from '../Models/restaurante.interface';


@Injectable()
export class RestauranteService{

    constructor (private http: Http){}

    //Lista Restaurantes
    getRestaurantes(){
        return this.http.get("http://localhost:58287/api/restaurante/GetRestaurantes/").map(data=> <IRestaurante[]>data.json());

    }
    
    //Lista Restaurantes de acordo com o filtro
    getRestaurantesFiltrados(filtro: string){
        return this.http.get(`http://localhost:58287/api/restaurante/GetFilterRestaurantes?filtro=${filtro}`).map(data=> <IRestaurante[]>data.json());

    }

    //Adiciona Restaurante
    addRestaurante(restaurante: IRestaurante){
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });       
        let body =  this.serializeObj(restaurante);
        return  this.http.post("http://localhost:58287/api/restaurante/PostRestaurante",body,options).map((res: Response) => res.json());
    }

    //Edita Restaurante
    editRestaurante(restaurante: IRestaurante) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });       
        let body =  this.serializeObj(restaurante);
        return  this.http.put(`http://localhost:58287/api/restaurante/PutRestaurante/${restaurante.IdRestaurante}`,body,options).map((res: Response) => res.json());
    }

    //Remove Restaurante
    deleteRestaurante(restauranteId:number) : Observable<any>{
        return  this.http.delete(`http://localhost:58287/api/restaurante/DeleteRestaurante/${restauranteId}`).map((res: Response) => res.json());
    }
    private serializeObj(obj) {
        var result = [];
        for (var property in obj)
            result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    
        return result.join("&");
    }
}