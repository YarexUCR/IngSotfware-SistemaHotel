import { Habitacion } from "./Habitacion";

export interface Reserva{
    id : number;
    cliente : string;
    cedula : string;
    email : string;
    habitaciones : Habitacion [];
    total : number;
    checkIn : Date,
    checkOut : Date
  }