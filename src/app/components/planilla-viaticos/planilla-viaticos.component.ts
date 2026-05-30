// Componente Planilla de Viáticos - Gestión de viáticos
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViaticosService } from '../../services/viaticos.service';
import { Viatico } from '../../interfaces/viatico.interface';

@Component({
  selector: 'app-planilla-viaticos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planilla-viaticos.component.html',
  styleUrl: './planilla-viaticos.component.css'
})
export class PlanillaViaticosComponent implements OnInit {
  // Formulario de viático
  viatico: Viatico = {
    dni: '',
    especialidad: '',
    nombres: '',
    motivoComision: '',
    numeroDias: 0,
    montoPorDia: 0,
    importe: 0,
    firma: false,
    huella: false
  };

  // Lista de viáticos registrados
  viaticos: Viatico[] = [];

  // Variables de control
  editando = false;
  idEditar: number | null = null;
  mensajeExito = '';
  mostrarTabla = false;

  // Errores de validación
  errores: { [key: string]: string } = {};

  constructor(private viaticosService: ViaticosService) { }

  ngOnInit(): void {
    this.cargarViaticos();
  }

  /**
   * Carga todos los viáticos del servidor
   */
  cargarViaticos(): void {
    this.viaticosService.obtener().subscribe({
      next: (datos) => {
        this.viaticos = datos;
      },
      error: (error) => {
        console.error('Error al cargar viáticos:', error);
      }
    });
  }

  /**
   * Valida los campos del formulario
   * @returns true si el formulario es válido
   */
  validarFormulario(): boolean {
    this.errores = {};

    // Validar DNI
    if (!this.viatico.dni || this.viatico.dni.trim() === '') {
      this.errores['dni'] = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(this.viatico.dni)) {
      this.errores['dni'] = 'El DNI debe tener 8 dígitos';
    }

    // Validar nombres
    if (!this.viatico.nombres || this.viatico.nombres.trim() === '') {
      this.errores['nombres'] = 'El nombre es obligatorio';
    }

    // Validar especialidad
    if (!this.viatico.especialidad || this.viatico.especialidad.trim() === '') {
      this.errores['especialidad'] = 'La especialidad es obligatoria';
    }

    // Validar motivo
    if (!this.viatico.motivoComision || this.viatico.motivoComision.trim() === '') {
      this.errores['motivo'] = 'El motivo de comisión es obligatorio';
    }

    // Validar número de días
    if (this.viatico.numeroDias <= 0) {
      this.errores['dias'] = 'El número de días debe ser mayor a 0';
    }

    // Validar monto por día
    if (this.viatico.montoPorDia <= 0) {
      this.errores['monto'] = 'El monto por día debe ser mayor a 0';
    }

    return Object.keys(this.errores).length === 0;
  }

  /**
   * Calcula el importe total (días x monto por día)
   */
  calcularImporte(): void {
    this.viatico.importe = this.viatico.numeroDias * this.viatico.montoPorDia;
  }

  /**
   * Guarda o actualiza un viático
   */
  guardarViatico(): void {
    if (!this.validarFormulario()) {
      return;
    }

    // Calcular importe antes de guardar
    this.calcularImporte();

    // Agregar fecha de registro
    this.viatico.fechaRegistro = new Date().toISOString().split('T')[0];

    if (this.editando && this.idEditar) {
      // Actualizar viático existente
      this.viaticosService.actualizar(this.idEditar, this.viatico).subscribe({
        next: () => {
          this.mensajeExito = 'Viático actualizado correctamente';
          this.limpiarFormulario();
          this.cargarViaticos();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => {
          console.error('Error al actualizar viático:', error);
        }
      });
    } else {
      // Guardar nuevo viático
      this.viaticosService.guardar(this.viatico).subscribe({
        next: () => {
          this.mensajeExito = 'Viático guardado correctamente';
          this.limpiarFormulario();
          this.cargarViaticos();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => {
          console.error('Error al guardar viático:', error);
        }
      });
    }
  }

  /**
   * Carga un viático para editar
   * @param viatico - Viático a editar
   */
  editarViatico(viatico: Viatico): void {
    this.viatico = { ...viatico };
    this.editando = true;
    this.idEditar = viatico.id || null;
    window.scrollTo(0, 0);
  }

  /**
   * Elimina un viático
   * @param id - ID del viático a eliminar
   */
  eliminarViatico(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro que deseas eliminar este viático?')) {
      this.viaticosService.eliminar(id).subscribe({
        next: () => {
          this.mensajeExito = 'Viático eliminado correctamente';
          this.cargarViaticos();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => {
          console.error('Error al eliminar viático:', error);
        }
      });
    }
  }

  /**
   * Limpia el formulario y reinicia valores
   */
  limpiarFormulario(): void {
    this.viatico = {
      dni: '',
      especialidad: '',
      nombres: '',
      motivoComision: '',
      numeroDias: 0,
      montoPorDia: 0,
      importe: 0,
      firma: false,
      huella: false
    };
    this.editando = false;
    this.idEditar = null;
    this.errores = {};
  }

  /**
   * Exporta la tabla a CSV
   */
  exportarCSV(): void {
    const headers = ['DNI', 'Nombre', 'Especialidad', 'Motivo', 'Días', 'Monto Día', 'Importe'];
    const data = this.viaticos.map(v => [
      v.dni,
      v.nombres,
      v.especialidad,
      v.motivoComision,
      v.numeroDias,
      v.montoPorDia,
      v.importe
    ]);

    let csv = headers.join(',') + '\n';
    data.forEach(row => {
      csv += row.join(',') + '\n';
    });

    const link = document.createElement('a');
    const blob = new Blob([csv], { type: 'text/csv' });
    link.href = window.URL.createObjectURL(blob);
    link.download = 'viaticos.csv';
    link.click();
  }
}
