// Componente Rendición de Cuentas - Gestión de rendiciones
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RendicionesService } from '../../services/rendiciones.service';
import { ColaboradorService } from '../../services/colaborador.service';
import { Rendicion } from '../../interfaces/rendicion.interface';
import { Boleta } from '../../interfaces/boleta.interface';

@Component({
  selector: 'app-rendicion-cuentas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rendicion-cuentas.component.html',
  styleUrl: './rendicion-cuentas.component.css'
})
export class RendicionCuentasComponent implements OnInit {
  // Formulario principal de rendición
  rendicion: Rendicion = {
    numeroSiaf: '',
    dependencia: '',
    dni: '',
    especialidad: '',
    nombres: '',
    motivo: '',
    lugarComision: '',
    clasificador: '',
    boletas: [],
    totalGastos: 0,
    estado: 'pendiente'
  };

  // Boleta temporal para agregar
  boletaTemporal: Boleta = {
    numero: '',
    monto: 0,
    fecha: '',
    razonSocial: '',
    descripcion: ''
  };

  // Lista de rendiciones
  rendiciones: Rendicion[] = [];

  // Variables de control
  editando = false;
  idEditar: number | null = null;
  mensajeExito = '';
  agregarBoleta = false;

  // Errores
  errores: { [key: string]: string } = {};
  erroresBoleta: { [key: string]: string } = {};

  constructor(
    private rendicionesService: RendicionesService,
    private colaboradorService: ColaboradorService
  ) { }

  ngOnInit(): void {
    this.cargarRendiciones();
  }

  /**
   * Busca colaborador por DNI y autocompleta los campos
   */
  buscarColaboradorPorDni(): void {
    if (this.rendicion.dni.length === 8) {
      this.colaboradorService.obtenerPorDni(this.rendicion.dni).subscribe({
        next: (colaboradores) => {
          if (colaboradores.length > 0) {
            const colaborador = colaboradores[0];
            this.rendicion.nombres = colaborador.nombres;
            this.rendicion.especialidad = colaborador.especialidad;
          }
        },
        error: (error) => {
          console.error('Error al buscar colaborador:', error);
        }
      });
    }
  }

  /**
   * Carga todas las rendiciones
   */
  cargarRendiciones(): void {
    this.rendicionesService.obtener().subscribe({
      next: (datos) => {
        this.rendiciones = datos;
      },
      error: (error) => console.error('Error:', error)
    });
  }

  /**
   * Valida el formulario principal
   */
  validarFormulario(): boolean {
    this.errores = {};

    if (!this.rendicion.numeroSiaf || this.rendicion.numeroSiaf.trim() === '') {
      this.errores['siaf'] = 'El número SIAF es obligatorio';
    }

    if (!this.rendicion.dni || this.rendicion.dni.trim() === '') {
      this.errores['dni'] = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(this.rendicion.dni)) {
      this.errores['dni'] = 'El DNI debe tener 8 dígitos';
    }

    if (!this.rendicion.nombres || this.rendicion.nombres.trim() === '') {
      this.errores['nombres'] = 'El nombre es obligatorio';
    }

    if (!this.rendicion.dependencia || this.rendicion.dependencia.trim() === '') {
      this.errores['dependencia'] = 'La dependencia es obligatoria';
    }

    if (!this.rendicion.motivo || this.rendicion.motivo.trim() === '') {
      this.errores['motivo'] = 'El motivo es obligatorio';
    }

    if (this.rendicion.boletas.length === 0) {
      this.errores['boletas'] = 'Debe agregar al menos una boleta';
    }

    return Object.keys(this.errores).length === 0;
  }

  /**
   * Valida la boleta temporal
   */
  validarBoleta(): boolean {
    this.erroresBoleta = {};

    if (!this.boletaTemporal.numero || this.boletaTemporal.numero.trim() === '') {
      this.erroresBoleta['numero'] = 'El número de boleta es obligatorio';
    }

    if (this.boletaTemporal.monto <= 0) {
      this.erroresBoleta['monto'] = 'El monto debe ser mayor a 0';
    }

    if (!this.boletaTemporal.fecha) {
      this.erroresBoleta['fecha'] = 'La fecha es obligatoria';
    }

    if (!this.boletaTemporal.razonSocial || this.boletaTemporal.razonSocial.trim() === '') {
      this.erroresBoleta['razonSocial'] = 'La razón social es obligatoria';
    }

    return Object.keys(this.erroresBoleta).length === 0;
  }

  /**
   * Agrega una boleta a la rendición
   */
  agregarBoletaAlista(): void {
    if (!this.validarBoleta()) {
      return;
    }

    const boleta: Boleta = { ...this.boletaTemporal };
    this.rendicion.boletas.push(boleta);
    this.calcularTotal();
    this.limpiarBoleta();
    this.agregarBoleta = false;
  }

  /**
   * Elimina una boleta de la lista
   * @param index - Índice de la boleta
   */
  eliminarBoleta(index: number): void {
    this.rendicion.boletas.splice(index, 1);
    this.calcularTotal();
  }

  /**
   * Calcula el total de gastos
   */
  calcularTotal(): void {
    this.rendicion.totalGastos = this.rendicion.boletas.reduce((total, boleta) => total + boleta.monto, 0);
  }

  /**
   * Limpia la boleta temporal
   */
  limpiarBoleta(): void {
    this.boletaTemporal = {
      numero: '',
      monto: 0,
      fecha: '',
      razonSocial: '',
      descripcion: ''
    };
    this.erroresBoleta = {};
  }

  /**
   * Guarda o actualiza la rendición
   */
  guardarRendicion(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.rendicion.fechaRegistro = new Date().toISOString().split('T')[0];

    if (this.editando && this.idEditar) {
      this.rendicionesService.actualizar(this.idEditar, this.rendicion).subscribe({
        next: () => {
          this.mensajeExito = 'Rendición actualizada correctamente';
          this.limpiarFormulario();
          this.cargarRendiciones();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => console.error('Error:', error)
      });
    } else {
      this.rendicionesService.guardar(this.rendicion).subscribe({
        next: () => {
          this.mensajeExito = 'Rendición guardada correctamente';
          this.limpiarFormulario();
          this.cargarRendiciones();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  /**
   * Carga una rendición para editar
   */
  editarRendicion(rendicion: Rendicion): void {
    this.rendicion = JSON.parse(JSON.stringify(rendicion));
    this.editando = true;
    this.idEditar = rendicion.id || null;
    window.scrollTo(0, 0);
  }

  /**
   * Elimina una rendición
   */
  eliminarRendicion(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro que deseas eliminar esta rendición?')) {
      this.rendicionesService.eliminar(id).subscribe({
        next: () => {
          this.mensajeExito = 'Rendición eliminada correctamente';
          this.cargarRendiciones();
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
    this.rendicion = {
      numeroSiaf: '',
      dependencia: '',
      dni: '',
      especialidad: '',
      nombres: '',
      motivo: '',
      lugarComision: '',
      clasificador: '',
      boletas: [],
      totalGastos: 0,
      estado: 'pendiente'
    };
    this.limpiarBoleta();
    this.editando = false;
    this.idEditar = null;
    this.agregarBoleta = false;
    this.errores = {};
  }
}
