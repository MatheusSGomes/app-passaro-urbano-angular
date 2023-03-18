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
    return this.http.get(`${URL_API}?destaque=true`);
  }

  public getOfertasPorCategoria(categoria: string): Observable<Object> {
    return this.http.get(`${URL_API}?categoria=${categoria}`);
  }

  public getOfertaPorId(id: number): Observable<object> {
    return this.http.get(`${URL_API}?id=${id}`);
  }
}