

export class Habitacion{
    tipo: string;
    cantidad: number;
    precio: number;
    constructor(){
        this.tipo='';
        this.cantidad=0;
        this.precio=0;
    }

    getTipo(): string {
        return this.tipo;
      }
    
      setTipo(tipo: string): void {
        this.tipo = tipo;
      }
    
      getCantidad(): number {
        return this.cantidad;
      }
    
      setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
      }
    
      getPrecio(): number {
        return this.precio;
      }
    
      setPrecio(precio: number): void {
        this.precio = precio;
      }
    
      toString(): string {
        return `Tipo: ${this.tipo}, Cantidad: ${this.cantidad}, Precio: ${this.precio}`;
      }
}