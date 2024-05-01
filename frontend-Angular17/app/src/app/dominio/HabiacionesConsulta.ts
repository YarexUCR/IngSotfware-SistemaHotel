

export interface HabiacionesConsulta {
    id: number;
    estado: string;
    activo: boolean;
    numero: number;
    disponible: boolean;
    tipo: {
      nombre: string;
      id: number;
      descripcion: string;
      precio: number;
      imagen: string;
      cantidad: number;
    };
}