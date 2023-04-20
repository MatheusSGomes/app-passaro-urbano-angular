import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { retry, switchMap } from "rxjs/operators"; 

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
    .pipe(switchMap((termo: string) => {
      console.log('requisição http para api', termo);
      return this.ofertasService.pesquisaOfertas(termo);
    }));

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas);
    });
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }
}