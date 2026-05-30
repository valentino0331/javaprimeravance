// Interfaz para Comisión - Define la estructura de papeletas de comisión
export interface Comision {
  id?: number;
  dni: string;          // DNI del colaborador
  especialidad: string; // Especialidad del colaborador
  nombres: string;      // Nombres completos
  lugar: string;        // Lugar de destino de la comisión
  fechaInicio: string;  // Fecha de inicio de la comisión
  fechaTermino: string; // Fecha de término de la comisión
  motivo?: string;      // Motivo de la comisión
  fechaRegistro?: string; // Fecha de registro en el sistema
}
