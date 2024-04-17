import { TipoHabitacion } from "./TipoHabitacion";

export interface Habitacion{
    id : number;
    estado : string;
    numero : number;
    tipo : TipoHabitacion;
  }