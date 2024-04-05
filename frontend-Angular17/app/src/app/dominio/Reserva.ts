import { Habitacion } from "./Habitacion";

export class Reserva{
    id: number;
    checkIn: string;
    checkOut: string;
    habitaciones: Habitacion[];
    constructor(){
        this.id = 0;
        this.checkIn = "";
        this.checkOut  = "";
        this.habitaciones = [];
    }
}