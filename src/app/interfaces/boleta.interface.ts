// Interfaz para Boleta - Define la estructura de gastos en viáticos
export interface Boleta {
  id?: number;
  numero: string;       // Número de recibo o boleta
  monto: number;        // Monto gastado
  fecha: string;        // Fecha del gasto
  razonSocial: string;  // Nombre del proveedor o establecimiento
  descripcion?: string; // Descripción del gasto
}
