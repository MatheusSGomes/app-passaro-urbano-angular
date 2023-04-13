import { Component } from '@angular/core';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent {

  constructor(
    private ofertasService: OfertasService
  ) {}

  public pesquisa(termoDaBusca: String): void {
    console.log(termoDaBusca);
  }
}
