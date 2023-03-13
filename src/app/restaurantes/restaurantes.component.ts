import { Component } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ]
})
export class RestaurantesComponent {

  public ofertas!: any;

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    this.carregaOfertasPorCategoria();
  }
  
  public async carregaOfertasPorCategoria() {
    const ofertasCategoria = this.ofertasService.getOfertasPorCategoria('restaurante');
    this.ofertas = await lastValueFrom(ofertasCategoria);
    console.log(this.ofertas);
  }
}
