import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import {Oferta} from "../../dominio/Oferta";

@Component({
  selector: 'app-lista-ofertas',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './lista-ofertas.component.html',
  styleUrl: './lista-ofertas.component.scss'
})
export class ListaOfertasComponent implements OnInit{
  token: string | null;//token de session
  ofertasPaginacion:Oferta[] = [];

  constructor(private router: Router) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit() {
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }




}
