// Interfaces para Colaborador - Define la estructura de datos de una persona
export interface Colaborador {
  id?: number;
  dni: string;          // DNI del colaborador
  nombres: string;      // Nombres completos
  especialidad: string; // Profesión o especialidad
  area?: string;        // Área o dependencia
}
