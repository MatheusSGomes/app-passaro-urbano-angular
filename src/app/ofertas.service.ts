import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, map, take } from 'rxjs';

@Injectable()
export class OfertasService {

  public source!: any;
  constructor(private http: HttpClient) { }

  public getOfertas(): Observable<Object> {
    const url = 'http://localhost:3000/ofertas?destaque=true';
    return this.http.get(url);
  }
}