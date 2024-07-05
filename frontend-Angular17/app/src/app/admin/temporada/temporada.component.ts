import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from '../../footer/footer.component';
import { Temporada } from '../../dominio/Temporada';
import { TemporadaService } from '../../api/temporada.services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TemporadaAddComponent } from '../temporada-add/temporada-add.component';
import { TemporadaUpdateComponent } from '../temporada-update/temporada-update.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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
    selector: 'app-temporada',
    standalone: true,
    templateUrl: './temporada.component.html',
    styleUrl: './temporada.component.scss',
    imports: [MatProgressSpinnerModule,
        FooterComponent,
        MatTableModule, MatButtonModule, MatDividerModule,
        MatIconModule, CommonModule, MatPaginatorModule, MatPaginator,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ]
})
export class TemporadaComponent implements OnInit {

   
    token: string | null | undefined;//token de session
    paginacion: Temporada[] = [];
    Ofertas: Temporada[] = [];
    displayedColumns: string[] = ['inicio', 'fin', 'descuento', 'Editar', 'eliminar'];
    cargando: boolean = false;
    constructor(private router: Router, private routerA: ActivatedRoute, private temporadaService: TemporadaService, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) {
        //para resguardar ruta
        if (typeof localStorage !== 'undefined') {
            this.token = localStorage.getItem('token');
        } else {
            this.token = null;
        }
    }
    ngOnInit(): void {
        this.cargando = true;
        this.cargartemporadas();
    }

    cargartemporadas() {
        this.temporadaService.getTemporadas().subscribe(
            (data) => {
                this.Ofertas = data;
                this.paginacion = this.Ofertas;
                this.cargando = false;
                console.log(this.Ofertas);
                this.changeDetectorRef.detectChanges();
            },
            (error) => {
                console.error(error);
                this.cargando = false;
                this.changeDetectorRef.detectChanges();
            }
        );
    }


    openDialogAgregarTemporada() {
        const dialogRef = this.dialog.open(TemporadaAddComponent);


        dialogRef.afterClosed().subscribe(result => {
            // Forzar detección de cambios
            this.cargartemporadas();
        });
    }

    cargarPaginadas($event: PageEvent) {
        this.cargando = true;
        if ($event) {
            const startIndex = $event.pageIndex * $event.pageSize;
            const endIndex = startIndex + $event.pageSize;
            this.paginacion = this.Ofertas.slice(startIndex, endIndex);
            this.cargando = false;
        }
    }



    deleteTemporada(iD_Temporada: number) {
        this.temporadaService.deleteTemporada(iD_Temporada).subscribe(
            (data) => {
                this.cargartemporadas();
            },
            (error) => {
                console.error(error);
            }
        );

    }

    openDialogActualizarTemporada(temporada1: Temporada) {
        const dialogRef = this.dialog.open(TemporadaUpdateComponent, {
           
            data: { temporada: temporada1 },
        });


        dialogRef.afterClosed().subscribe(result => {

            this.cargartemporadas();
        });
    }


}
