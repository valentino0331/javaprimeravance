// Componente Papeleta de Comisión - Gestión de papeletas
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComisionesService } from '../../services/comisiones.service';
import { Comision } from '../../interfaces/comision.interface';

@Component({
  selector: 'app-papeleta-comision',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './papeleta-comision.component.html',
  styleUrl: './papeleta-comision.component.css'
})
export class PapeletaComisionComponent implements OnInit {
  // Formulario de comisión
  comision: Comision = {
    dni: '',
    especialidad: '',
    nombres: '',
    lugar: '',
    fechaInicio: '',
    fechaTermino: '',
    motivo: ''
  };

  // Lista de comisiones
  comisiones: Comision[] = [];

  // Variables de control
  editando = false;
  idEditar: number | null = null;
  mensajeExito = '';

  // Errores de validación
  errores: { [key: string]: string } = {};

  constructor(private comisionesService: ComisionesService) { }

  ngOnInit(): void {
    this.cargarComisiones();
  }

  /**
   * Carga todas las comisiones
   */
  cargarComisiones(): void {
    this.comisionesService.obtener().subscribe({
      next: (datos) => {
        this.comisiones = datos;
      },
      error: (error) => {
        console.error('Error al cargar comisiones:', error);
      }
    });
  }

  /**
   * Valida los campos del formulario
   * @returns true si el formulario es válido
   */
  validarFormulario(): boolean {
    this.errores = {};

    if (!this.comision.dni || this.comision.dni.trim() === '') {
      this.errores['dni'] = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(this.comision.dni)) {
      this.errores['dni'] = 'El DNI debe tener 8 dígitos';
    }

    if (!this.comision.nombres || this.comision.nombres.trim() === '') {
      this.errores['nombres'] = 'El nombre es obligatorio';
    }

    if (!this.comision.especialidad || this.comision.especialidad.trim() === '') {
      this.errores['especialidad'] = 'La especialidad es obligatoria';
    }

    if (!this.comision.lugar || this.comision.lugar.trim() === '') {
      this.errores['lugar'] = 'El lugar es obligatorio';
    }

    if (!this.comision.fechaInicio) {
      this.errores['fechaInicio'] = 'La fecha de inicio es obligatoria';
    }

    if (!this.comision.fechaTermino) {
      this.errores['fechaTermino'] = 'La fecha de término es obligatoria';
    }

    // Validar que la fecha de término sea posterior a la de inicio
    if (this.comision.fechaInicio && this.comision.fechaTermino) {
      if (new Date(this.comision.fechaTermino) <= new Date(this.comision.fechaInicio)) {
        this.errores['fechas'] = 'La fecha de término debe ser posterior a la de inicio';
      }
    }

    return Object.keys(this.errores).length === 0;
  }

  /**
   * Guarda o actualiza una comisión
   */
  guardarComision(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.comision.fechaRegistro = new Date().toISOString().split('T')[0];

    if (this.editando && this.idEditar) {
      this.comisionesService.actualizar(this.idEditar, this.comision).subscribe({
        next: () => {
          this.mensajeExito = 'Papeleta actualizada correctamente';
          this.limpiarFormulario();
          this.cargarComisiones();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => console.error('Error:', error)
      });
    } else {
      this.comisionesService.guardar(this.comision).subscribe({
        next: () => {
          this.mensajeExito = 'Papeleta guardada correctamente';
          this.limpiarFormulario();
          this.cargarComisiones();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  /**
   * Carga una comisión para editar
   * @param comision - Comisión a editar
   */
  editarComision(comision: Comision): void {
    this.comision = { ...comision };
    this.editando = true;
    this.idEditar = comision.id || null;
    window.scrollTo(0, 0);
  }

  /**
   * Elimina una comisión
   * @param id - ID de la comisión
   */
  eliminarComision(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro que deseas eliminar esta papeleta?')) {
      this.comisionesService.eliminar(id).subscribe({
        next: () => {
          this.mensajeExito = 'Papeleta eliminada correctamente';
          this.cargarComisiones();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  /**
   * Limpia el formulario
   */
  limpiarFormulario(): void {
    this.comision = {
      dni: '',
      especialidad: '',
      nombres: '',
      lugar: '',
      fechaInicio: '',
      fechaTermino: '',
      motivo: ''
    };
    this.editando = false;
    this.idEditar = null;
    this.errores = {};
  }

  /**
   * Calcula los días de la comisión
   * @param comision - Comisión
   * @returns Número de días
   */
  calcularDias(comision: Comision): number {
    const inicio = new Date(comision.fechaInicio).getTime();
    const termino = new Date(comision.fechaTermino).getTime();
    const dias = Math.ceil((termino - inicio) / (1000 * 60 * 60 * 24));
    return dias + 1;
  }
}
