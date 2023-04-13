import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Observable, lastValueFrom, interval, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  private tempoObservableSubscription!: Subscription;
  private testeObservableSubscription!: Subscription;

  public oferta!: any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  async ngOnInit() {
    const ofertaPorId = this.ofertasService.getOfertaPorId(this.route.snapshot.params['id']);
    this.oferta = await lastValueFrom(ofertaPorId);
    this.oferta = this.oferta[0];
    
    let tempo = interval(2000);
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => console.log(intervalo));

    // observable (observável)
    let meuObservableTeste = Observable.create((observador: Observer<number>) => {
      observador.next(1);
      observador.next(2);
      // observador.error('Algum erro foi encontrado');
      observador.complete();
      observador.next(3); // não executado
    });

    // observable (observador)
    this.testeObservableSubscription =  meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado),
      (error: string) => console.error(error),
      () => console.log('stream de eventos foi finalizada')
    );
  }

  ngOnDestroy(): void {
    this.tempoObservableSubscription.unsubscribe();
    this.testeObservableSubscription.unsubscribe();
  }
}
