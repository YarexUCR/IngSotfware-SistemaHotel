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
import { ActalizarOfertaComponent } from '../actalizar-oferta/actalizar-oferta.component';
import { AgregarOfertaComponent } from '../agregar-oferta/agregar-oferta.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
@Component({
  selector: 'app-lista-ofertas',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule, 
    MatIconModule, CommonModule, MatPaginatorModule,MatPaginator,
    FooterComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lista-ofertas.component.html',
  styleUrl: './lista-ofertas.component.scss'
})
export class ListaOfertasComponent implements OnInit{
  token: string | null;//token de session
  paginacion:Oferta[] = [];
  Ofertas:Oferta[] = [];
  displayedColumns: string[] = ['nombre', 'inicio', 'fin', 'descuento', 'tipoHabitacions','Editar','eliminar'];
  cargando: boolean= false;

  constructor(private dialog: MatDialog,private router: Router,private routerA: ActivatedRoute,private ofertasService: OfertaService,private changeDetectorRef: ChangeDetectorRef) {
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
  this.cargando  = true;

  this.ofertasService.obtenerOferta().subscribe(
    (data) => {
      this.Ofertas = data;
      this.paginacion = this.Ofertas.slice(0, 5);
      this.cargando  = false;
    },
    (error) => {
      this.cargando  = false;
    }
  );

}
//----funcion para eliminar ofertas'

//----funcion para actualizar ofertas'

openDialogActualizarOferta(idOferta:number): void {
  const dialogRef  = this.dialog.open(ActalizarOfertaComponent, {
    data: {id: idOferta},
  });


  dialogRef.afterClosed().subscribe(result => {

    this.cargarfOfertas();
  });
}


openDialogAgregarOferta(): void {
  const dialogRef  = this.dialog.open(AgregarOfertaComponent);


  dialogRef.afterClosed().subscribe(result => {
  // Forzar detección de cambios
    this.cargarfOfertas();
  });
}



deleteOferta(idOferta:number){

  
  this.ofertasService.eliminarOferta(idOferta).subscribe(
    (data) => {

      this.cargarfOfertas();
    },
    (error) => {
      console.error(error);
    }
  );}




}//fin de la clase  ListaOfertasComponent
