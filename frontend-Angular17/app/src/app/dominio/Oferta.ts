import { TipoHabitacion } from './TipoHabitacion';
export interface Oferta {
    id: number;
    inicio: Date;
    fin: Date;
    descuento: number;
    tipoHabitacions: TipoHabitacion[];
  }