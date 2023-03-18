import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta!: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  async ngOnInit() {
    const ofertaPorId = this.ofertasService.getOfertaPorId(this.route.snapshot.params['id']);
    this.oferta = await lastValueFrom(ofertaPorId);
  }
}
