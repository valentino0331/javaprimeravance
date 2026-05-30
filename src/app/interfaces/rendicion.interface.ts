// Interfaz para Rendición de Cuentas - Define la estructura de rendición de gastos
import { Boleta } from './boleta.interface';

export interface Rendicion {
  id?: number;
  numeroSiaf: string;   // Número SIAF del gasto
  dependencia: string;  // Dependencia responsable
  dni: string;          // DNI del colaborador
  especialidad: string; // Especialidad del colaborador
  nombres: string;      // Nombres completos
  motivo: string;       // Motivo de la rendición
  lugarComision: string; // Lugar donde se realizó la comisión
  clasificador: string; // Clasificador presupuestal
  boletas: Boleta[];    // Array de boletas/gastos
  totalGastos?: number; // Total de gastos de la rendición
  estado?: string;      // Estado de la rendición (pendiente, aprobada, etc.)
  fechaRegistro?: string; // Fecha de registro
}
