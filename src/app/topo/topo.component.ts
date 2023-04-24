import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { retry, switchMap, debounceTime, distinctUntilChanged, catchError } from "rxjs/operators"; 

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private ofertasService: OfertasService
  ) {}

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa // retorno ao término de Oferta[]
    .pipe(
      retry({count: 5, delay: 1000}),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        console.log('requisição http para api', termo);

        if (termo.trim() === '') {
          // retornar um observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        
        return this.ofertasService.pesquisaOfertas(termo)}),
        catchError((err: any) => {
          console.log(err);
          return of<Oferta[]>([]);
        })
    );

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas);
    });
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }
}