import { Component } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { retry } from "rxjs/operators"; 

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent {

  public ofertas!: Observable<Oferta[]>;

  constructor(
    private ofertasService: OfertasService
  ) {}

  public pesquisa(termoDaBusca: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);

    this.ofertas
    .pipe(retry({count: 5, delay: 1000}))
    .subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (error: any) => console.log(error),
      () => console.log('Fluxo de eventos completo')
    );

  }
}
