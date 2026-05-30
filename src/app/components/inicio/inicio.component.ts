// Componente Inicio - Página principal del sistema
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  // Array de módulos disponibles en el sistema
  modulos = [
    {
      titulo: 'Planilla de Viáticos',
      descripcion: 'Registra y gestiona los gastos de desplazamiento y viáticos de los colaboradores.',
      icono: 'receipt',
      ruta: '/planilla',
      color: 'primary'
    },
    {
      titulo: 'Papeleta de Comisión',
      descripcion: 'Crea y administra las papeletas de comisión para desplazamientos oficiales.',
      icono: 'file-text',
      ruta: '/papeleta',
      color: 'success'
    },
    {
      titulo: 'Rendición de Cuentas',
      descripcion: 'Realiza la rendición de gastos con detalle de boletas y comprobantes.',
      icono: 'calculator',
      ruta: '/rendicion',
      color: 'warning'
    },
    {
      titulo: 'Consulta de Rendiciones',
      descripcion: 'Busca y consulta rendiciones de cuentas registradas en el sistema.',
      icono: 'search',
      ruta: '/consulta',
      color: 'info'
    }
  ];
}
