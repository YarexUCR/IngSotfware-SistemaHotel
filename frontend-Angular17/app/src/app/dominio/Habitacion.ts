import { TipoHabitacion } from "./TipoHabitacion";

export interface Habitacion{
    id : number;
    estado : string;
    activo: boolean;
    numero : number;
    tipo : TipoHabitacion;
    
  }