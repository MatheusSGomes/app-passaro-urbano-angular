import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pedido } from "./shared/pedido.model";

@Injectable()
export class OrdemCompraService {
  constructor (private http: HttpClient) {}

  public efetivarCompra (pedido: Pedido): void {
    console.log(pedido);
  }
}