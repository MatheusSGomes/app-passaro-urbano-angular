import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {
  // public ofertas!: Oferta[];
  public ofertas!: any;

  constructor(private ofertasService: OfertasService) {}

  ngOnInit() {
    // this.ofertas = this.ofertasService.getOfertas();
    this.carregaOfertas();
  }
  public async carregaOfertas () {
    const conteudo = this.ofertasService.getOfertas();
    this.ofertas = await lastValueFrom(conteudo);
  }
}
