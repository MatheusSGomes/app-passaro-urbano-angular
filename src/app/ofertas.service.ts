import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {

  public source!: any;

  constructor(private http: HttpClient) { }

  public getOfertas(): Observable<Object> {
    return this.http.get(`${URL_API}/ofertas?destaque=true`);
  }

  public getOfertasPorCategoria(categoria: string): Observable<Object> {
    return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`);
  }

  // public getOfertaPorId(id: number): Observable<object> {
  //   return this.http.get(`${URL_API}/ofertas?id=${id}`);
  // }

  public getOfertaPorId(id: number) {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
    .toPromise()
    .then(response => response);
  }

  public getComoUsarOfertaPorId(id: number) {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta[0].descricao;
      });
  }

  public getOndeFicaOfertaPorId(id: number) {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: any) => {
        return resposta[0].descricao;
      });
  }

}