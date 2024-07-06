import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../dominio/Reserva'; // Ajusta la ruta según la ubicación real de tu modelo Reserva
import { ReservasService } from '../../api/reservas.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf'; // Import the 'jsPDF' library

@Component({
  selector: 'app-ver-reserva',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  providers: [DatePipe],
  templateUrl: './ver-reserva.component.html',
  styleUrl: './ver-reserva.component.scss'
})
export class VerReservaComponent implements OnInit{


  reservacion: Reserva | undefined;
  dataSource = new MatTableDataSource<{ numero: number; nombreTipoHabitacion: string }>();
  displayedColumns: string[] = ['numero', 'nombreTipoHabitacion'];
  logoBase64: string | undefined;

  constructor(private route: ActivatedRoute ,private reservasService:ReservasService,private router: Router,private datePipe: DatePipe) { }
  volver() {
    this.router.navigate(['/admin/listadoReservaciones']);
  }


  ngOnInit(): void {
    this.loadImage();

    this.route.params.subscribe(params => {
      if (params['reservacion']) {
        this.reservacion = JSON.parse(params['reservacion']) as Reserva;
        // Asegúrate de que checkIn y checkOut sean de tipo Date
        
        const reservacion: Reserva = JSON.parse(params['reservacion']);
         
        if (reservacion.habitaciones) {
          const data = reservacion.habitaciones.map(habitacion => ({
            numero: habitacion.numero,
            nombreTipoHabitacion: habitacion.tipo.nombre
          }));
          this.dataSource.data = data;
        }
      }
    });
  }
  formatDate(datePipeValue: any): string {
    return this.datePipe.transform(datePipeValue, 'yyyy-MM-dd') || '';
  }

  eliminarReserva(): void {
    if (this.reservacion) {
      this.reservasService.actualizarBorradoLogicoReserva(this.reservacion.id).subscribe(
        response => {
          this.router.navigate(['/admin/listar-reserva']); // Ajusta la ruta según sea necesario
        },
        error => {
          this.router.navigate(['/admin/listar-reserva']); // Ajusta la ruta según sea necesario
        }
      );
    }
  }

  pdf() {
    throw new Error('Method not implemented.');
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


    doc.setFillColor(0, 24, 64);
    doc.setLineWidth(4); // Ancho del borde
    doc.rect(2, 2, pageWidth - 4, 75);

    // Dibujar el rectángulo azul oscuro
    doc.setFillColor(0, 24, 64);
    doc.rect(4, 4, pageWidth - 8, 71, 'F');

    doc.setFillColor(0, 24, 64);
    doc.setLineWidth(4); // Ancho del borde
    doc.rect(20, 78, pageWidth-40, pageHeight - 100);
    // Encabezado
   // doc.setFillColor(0, 24, 64);
   // doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('REPORTE', 60, 30);
    doc.text('RESERVA', pageWidth - 300, 30);

    // Añadir imagen
    if (this.logoBase64) {
      const imgWidth = 40;
      const imgHeight = 40;
      doc.addImage(this.logoBase64, 'PNG', 10, 5, imgWidth, imgHeight);
    }
  };

  drawHeader();

  // Fecha del reporte
  doc.setFontSize(12);
  doc.setTextColor(0, 24, 64);
  doc.text(`Cliente: ${this.reservacion?.cliente }`, 50, 100);
  doc.text(`Cédula: ${this.reservacion?.cedula}`, 50, 120);
  doc.text(`Email: ${this.reservacion?.email}`, 50, 140);
  doc.text(`Total: ${this.reservacion?.total}`, 50, 160);
  doc.text(`Check-in: ${this.formatDate(this.reservacion?.checkIn)}`, 50, 180);
  doc.text(`Check-out: ${this.formatDate(this.reservacion?.checkOut)}`, 50, 200);

  doc.setTextColor(0, 24, 64);
  doc.setFontSize(12);
  doc.text(`Copyright © Hotel Palm 2024`, 250, pageHeight-10);

  

  // Datos de la tabla
  const columns = ['Número de Habitación', 'Tipo de Habitacion', ];
  const filas = this.reservacion?.habitaciones.map(habitacion => [
    habitacion.numero,
    habitacion.tipo.nombre
  ]);


(doc as any).autoTable({
  headStyles: {
    fillColor: [0, 24, 64], // Color de fondo del encabezado en formato RGB
    textColor: [255, 255, 255], // Color de texto del encabezado en formato RGB
    fontStyle: 'bold', // Estilo de fuente del encabezado (opcional)
  },
  startY: 250, // Ajustar esta propiedad si es necesario para posicionar la tabla correctamente
  head: [columns],
  body: filas,
  didDrawCell: (data:any) => {
    
  },
  styles: {
    fontSize: 17 // Cambia el tamaño de letra de toda la tabla
  },didDrawPage: (data: any) => {
    // Verifica si la tabla se ha extendido más allá de los límites de la página actual
    if (data.startY === false) {
      // Agrega una nueva página antes de dibujar la siguiente parte de la tabla
      doc.addPage();
      // Ajusta startY para comenzar desde la parte superior de la nueva página
      data.startY = 50; // Ajusta este valor según sea necesario
    }
  }
});
doc.addImage('assets/iconos/Fondo.png', 45 , 150 , 500, 500);
  doc.save('Reporte_Reservas.pdf');
}





}
