import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HabitacionesService } from "../../api/Habitaciones.service";
import { ActivatedRoute, Router } from '@angular/router';
import {HabiacionesConsulta} from "../../dominio/HabiacionesConsulta";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import jsPDF from 'jspdf'; // Import the 'jsPDF' library
import 'jspdf-autotable';
@Component({
    selector: 'app-ver-estado-hotel-hoy',
    standalone: true,
    templateUrl: './ver-estado-hotel-hoy.component.html',
    styleUrl: './ver-estado-hotel-hoy.component.scss',
    imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule, MatPaginatorModule,MatPaginator,FooterComponent]
})
export class VerEstadoHotelHoyComponent implements OnInit {
  habitaciones: HabiacionesConsulta[] = [];
  check: string | null = null;
  token: string | null;//token de session
  habitacionesPaginadas: HabiacionesConsulta[] = [];
  displayedColumns: string[] = ['Numero', 'TipoHabitacion', 'Disponible'];
  
  cargarHabitacionesPaginadas(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.habitacionesPaginadas = this.habitaciones.slice(startIndex, endIndex);
  }
  constructor(private habitacionesServices: HabitacionesService, private routerA: ActivatedRoute,private router: Router) {
    //para resguardar ruta
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    } else {
      this.token = null;
    }
  }
  logoBase64: string | undefined;

  ngOnInit(): void{
    this.obtenerHora();
    this.loadImage();
    //verificar autenticacion
    if (this.token == null) {
      this.router.navigate(['/login']);
    }
  }


  //obtener hora de costa rica
obtenerHora(){
  
  fetch('http://worldtimeapi.org/api/timezone/America/Costa_Rica')
  .then(response => response.json())
  .then(data => {
    const fechaHoraActual = new Date(data.datetime);
    // Extraer año, mes y día
    const año = fechaHoraActual.getFullYear();
    const mes = ('0' + (fechaHoraActual.getMonth() + 1)).slice(-2); // Agregar ceros a la izquierda si es necesario
    const dia = ('0' + fechaHoraActual.getDate()).slice(-2); // Agregar ceros a la izquierda si es necesario
    // Formatear la fecha en el formato AAAA-MM-DD
    this.check = `${año}-${mes}-${dia}`;
    const checkValue = this.check !== null ? this.check : '';

    this.habitacionesServices.getHabitaciones(checkValue).subscribe(data => {
      if (Array.isArray(data)) {
        this.habitaciones = data; // Asigna el array de habitaciones
        this.habitacionesPaginadas = this.habitaciones.slice(0, 5);
      } else {
        // Si data no es un array, podría manejarlo según tus necesidades, por ejemplo, asignar un array vacío
        this.habitaciones = [];
        this.habitacionesPaginadas = [];
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener la fecha de Costa Rica:', error);
  });

}





/////PDF



loadImage(): void {
  const img = new Image();
  img.src = 'assets/logoPalm.png';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      this.logoBase64 = canvas.toDataURL('image/png');
    } else {
      console.error('Error getting canvas context.');
    }
  };
  img.onerror = (error) => {
    console.error('Error loading image: ', error);
  };
}

generarPDF(): void {
  if (!this.logoBase64) {
    console.error('Image not loaded yet.');
    return;
  }
    
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
 
  const drawHeader = () => {


    doc.setDrawColor(245, 196, 0); // Color del borde amarillo
    doc.setLineWidth(4); // Ancho del borde
    doc.rect(2, 2, pageWidth - 4, 75);

    // Dibujar el rectángulo azul oscuro
    doc.setFillColor(0, 24, 64);
    doc.rect(4, 4, pageWidth - 8, 71, 'F');

    doc.setDrawColor(245, 196, 0); // Color del borde amarillo
    doc.setLineWidth(4); // Ancho del borde
    doc.rect(20, 78, pageWidth-40, pageHeight - 100);
    // Encabezado
   // doc.setFillColor(0, 24, 64);
   // doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('REPORTE', 60, 30);
    doc.text('ESTADO DEL HOTEL HOY', pageWidth - 300, 30);

    // Añadir imagen
    if (this.logoBase64) {
      const imgWidth = 40;
      const imgHeight = 40;
      doc.addImage(this.logoBase64, 'PNG', 10, 5, imgWidth, imgHeight);
    }
  };

  drawHeader();

  // Fecha del reporte
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`Fecha: ${this.check}`, 350, 69);

  doc.setTextColor(0, 24, 64);
  doc.setFontSize(12);
  doc.text(`Copyright©Hotel Palm 2024`, 250, pageHeight-10);

  

  // Datos de la tabla
  const columns = ['Número de Habitación', 'Tipo de Habitacion', 'Activo'];
  const filas = this.habitaciones.map(habitacion => [
    habitacion.numero,
    habitacion.tipo.nombre,
    habitacion.activo ? 'Disponible' : 'Ocupando'
]);

(doc as any).autoTable({
  headStyles: {
    fillColor: [0, 24, 64], // Color de fondo del encabezado en formato RGB
    textColor: [255, 255, 255], // Color de texto del encabezado en formato RGB
    fontStyle: 'bold', // Estilo de fuente del encabezado (opcional)
  },
  startY: 100, // Ajustar esta propiedad si es necesario para posicionar la tabla correctamente
  head: [columns],
  body: filas,
  didDrawCell: (data:any) => {
    if (data.column.index === 2 && data.row.index>=0 && data.section === 'body') { // Comprueba si la celda es de la columna "Activo"
      const activo = data.cell.raw;
      if (activo === 'Disponible') {
        doc.addImage('assets/iconos/ck_circle - Copy.png', data.cell.x-20 , data.cell.y+5 , 15, 15);
      } else {
        doc.addImage('assets/iconos/cancel - Copy.png', data.cell.x-20 , data.cell.y+5  , 15, 15);
      }
    }
  },
  styles: {
    fontSize: 17 // Cambia el tamaño de letra de toda la tabla
  }
});
doc.addImage('assets/iconos/Fondo.png', 45 , 150 , 500, 500);
  doc.save('reporte_estado_hotel_hoy.pdf');
}


}





function autoTable(doc: jsPDF, arg1: { head: string[][]; body: string[][]; startY: number; theme: string; styles: { fontSize: number; cellPadding: number; }; headStyles: { fillColor: number[]; textColor: number[]; }; didDrawPage: (data: any) => void; }) {
  throw new Error('Function not implemented.');
}

