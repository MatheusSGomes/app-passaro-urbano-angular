import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OfertasService {

  public source!: any;
  private urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getOfertas(): Observable<Object> {
    return this.http.get(this.urlApi + '/ofertas?destaque=true');
  }

  public getOfertasPorCategoria(categoria: string): Observable<Object> {
    return this.http.get(this.urlApi + `/ofertas?categoria=${categoria}`);
  }
}