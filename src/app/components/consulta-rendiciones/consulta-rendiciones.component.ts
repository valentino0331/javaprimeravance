// Componente Consulta de Rendiciones - Búsqueda y visualización
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RendicionesService } from '../../services/rendiciones.service';
import { Rendicion } from '../../interfaces/rendicion.interface';

@Component({
  selector: 'app-consulta-rendiciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-rendiciones.component.html',
  styleUrl: './consulta-rendiciones.component.css'
})
export class ConsultaRendicionesComponent implements OnInit {
  // Criterios de búsqueda
  buscarDni = '';
  buscarNombre = '';
  buscarDependencia = '';
  buscarFecha = '';
  buscarEstado = '';

  // Rendiciones
  rendiciones: Rendicion[] = [];
  rendicionesFiltradas: Rendicion[] = [];

  // Control
  sin_resultados = false;
  detalleExpandido: number | null = null;

  constructor(private rendicionesService: RendicionesService) { }

  ngOnInit(): void {
    this.cargarRendiciones();
  }

  /**
   * Carga todas las rendiciones
   */
  cargarRendiciones(): void {
    this.rendicionesService.obtener().subscribe({
      next: (datos) => {
        this.rendiciones = datos;
        this.rendicionesFiltradas = datos;
      },
      error: (error) => console.error('Error:', error)
    });
  }

  /**
   * Realiza la búsqueda según los criterios
   */
  buscar(): void {
    this.rendicionesFiltradas = this.rendiciones.filter(r => {
      // Filtrar por DNI
      if (this.buscarDni && !r.dni.includes(this.buscarDni)) {
        return false;
      }

      // Filtrar por nombre
      if (this.buscarNombre && !r.nombres.toLowerCase().includes(this.buscarNombre.toLowerCase())) {
        return false;
      }

      // Filtrar por dependencia
      if (this.buscarDependencia && !r.dependencia.toLowerCase().includes(this.buscarDependencia.toLowerCase())) {
        return false;
      }

      // Filtrar por fecha
      if (this.buscarFecha && r.fechaRegistro !== this.buscarFecha) {
        return false;
      }

      // Filtrar por estado
      if (this.buscarEstado && r.estado !== this.buscarEstado) {
        return false;
      }

      return true;
    });

    this.sin_resultados = this.rendicionesFiltradas.length === 0;
  }

  /**
   * Limpia todos los filtros
   */
  limpiarBusqueda(): void {
    this.buscarDni = '';
    this.buscarNombre = '';
    this.buscarDependencia = '';
    this.buscarFecha = '';
    this.buscarEstado = '';
    this.rendicionesFiltradas = this.rendiciones;
    this.sin_resultados = false;
  }

  /**
   * Expande o contrae los detalles de una rendición
   * @param id - ID de la rendición
   */
  toggleDetalle(id: number | undefined): void {
    this.detalleExpandido = this.detalleExpandido === id ? null : id || null;
  }

  /**
   * Exporta los resultados a CSV
   */
  exportarCSV(): void {
    const headers = ['SIAF', 'DNI', 'Nombre', 'Dependencia', 'Total Gastos', 'Estado', 'Fecha'];
    const data = this.rendicionesFiltradas.map(r => [
      r.numeroSiaf,
      r.dni,
      r.nombres,
      r.dependencia,
      r.totalGastos,
      r.estado,
      r.fechaRegistro
    ]);

    let csv = headers.join(',') + '\n';
    data.forEach(row => {
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const link = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    link.href = window.URL.createObjectURL(blob);
    link.download = 'rendiciones.csv';
    link.click();
  }

  /**
   * Imprime los resultados
   */
  imprimir(): void {
    window.print();
  }

  /**
   * Obtiene el total de todos los gastos
   */
  getTotalGastos(): number {
    return this.rendicionesFiltradas.reduce((total, r) => total + (r.totalGastos || 0), 0);
  }

  /**
   * Obtiene el número de rendiciones por estado
   */
  getConteoPorEstado(estado: string): number {
    return this.rendicionesFiltradas.filter(r => r.estado === estado).length;
  }
}
