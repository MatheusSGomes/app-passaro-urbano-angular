import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent {

  public comoUsar: string = '';

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((parametros: Params) => {
      this.ofertasService.getComoUsarOfertaPorId(parametros['id'])
      .then((descricao: string) => {
        this.comoUsar = descricao;
      });
    });
  }
}
