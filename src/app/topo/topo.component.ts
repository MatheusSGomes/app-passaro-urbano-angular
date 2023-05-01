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
      debounceTime(1000), // executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), // para fazer pesquisas distintas
      switchMap((termo: string) => {

        if (termo.trim() === '') {
          return of<Oferta[]>([]);
        }
        
        return this.ofertasService.pesquisaOfertas(termo)}),
        catchError((err: any) => {
          return of<Oferta[]>([]);
        })
    );
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }
}