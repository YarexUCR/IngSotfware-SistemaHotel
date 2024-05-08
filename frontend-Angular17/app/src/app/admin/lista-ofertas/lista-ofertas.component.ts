import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import {Oferta} from "../../dominio/Oferta";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OfertaService } from '../../api/ofertas.service';
@Component({
  selector: 'app-lista-ofertas',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatPaginatorModule,MatPaginator,FooterComponent],
  templateUrl: './lista-ofertas.component.html',
  styleUrl: './lista-ofertas.component.scss'
})
export class ListaOfertasComponent implements OnInit{
  token: string | null;//token de session
  paginacion:Oferta[] = [];
  Ofertas:Oferta[] = [];
  displayedColumns: string[] = ['descripcion', 'inicio', 'fin', 'descuento', 'tipoHabitacions','Editar','eliminar'];


  constructor(private router: Router,private routerA: ActivatedRoute,private ofertasService: OfertaService) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  ngOnInit(): void{
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
    this.cargarfOfertas();
  }
  //------ function----------------
  cargarHabitacionesPaginadas(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginacion = this.Ofertas.slice(startIndex, endIndex);
  }

//----funcion para obtener ofertas'
cargarfOfertas(){
  this.ofertasService.obtenerOferta().subscribe(
    (data) => {
      this.Ofertas = data;
      this.paginacion = this.Ofertas.slice(0, 5);
    alert("Ofertas cargadas correctamente");
    },
    (error) => {
      console.error(error);
    }
  );

}
}