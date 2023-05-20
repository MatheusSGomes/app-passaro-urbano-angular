import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra!: number; 

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(120)
    ]),
    'numero': new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20)
    ]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {}

  public confirmarCompra(): void {
    if (this.formulario.status === "INVALID") {
      this.marcaCamposTouched();
    } else {
      
    }
  }

  public marcaCamposTouched() {
    Object
      .keys(this.formulario.controls)
      .forEach((formulario) => {
        this.formulario.get(formulario)?.markAsTouched();
      });
  }
}