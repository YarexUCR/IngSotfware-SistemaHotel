import { DatePipe } from "@angular/common";

export interface DescuentoOferta {
    nombre: string;
    precio: number;
    descuento: number;
    montoDescuento: number;
    precioConDescuento: number;
    oferta: string;
    inicio : Date;
    fin : Date;
}