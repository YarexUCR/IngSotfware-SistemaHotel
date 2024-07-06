import { DatePipe } from "@angular/common";
import { Habitacion } from "./Habitacion";

export interface Reserva{
    id : number;
    cliente : string;
    cedula : string;
    email : string;
    habitaciones : Habitacion [];
    total : number;
    checkIn : DatePipe,
    checkOut : DatePipe
}
