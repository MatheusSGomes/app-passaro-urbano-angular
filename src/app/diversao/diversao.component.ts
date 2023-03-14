import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService ]
})
export class DiversaoComponent implements OnInit {
  public ofertas!: any;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.carregaOfertasPorCategoria();
  }
  
  public async carregaOfertasPorCategoria() {
    const ofertasCategoria = this.ofertasService.getOfertasPorCategoria('diversao');
    this.ofertas = await lastValueFrom(ofertasCategoria);
  }
}
