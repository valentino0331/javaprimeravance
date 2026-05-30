// Interfaz para Viático - Define la estructura de gastos de desplazamiento
export interface Viatico {
  id?: number;
  dni: string;          // DNI del colaborador
  especialidad: string; // Especialidad del colaborador
  nombres: string;      // Nombres completos
  motivoComision: string; // Razón del viaje
  numeroDias: number;   // Cantidad de días de viaje
  montoPorDia: number;  // Pago diario por viático
  importe: number;      // Total calculado (numeroDias * montoPorDia)
  firma?: boolean;      // Indicador de si fue firmado
  huella?: boolean;     // Indicador de huella digital
  fechaRegistro?: string; // Fecha de registro
}
