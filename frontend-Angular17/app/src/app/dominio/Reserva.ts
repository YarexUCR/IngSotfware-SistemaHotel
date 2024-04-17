import { Habitacion } from "./Habitacion";

export interface Reserva{
    id : number;
    cliente : string;
    cedula : string;
    habitaciones : Habitacion [];
    imagen : string;
    total : number;
  }