// Componente Acerca de - Información del proyecto
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {
  // Información de integrantes del equipo
  integrantes = [
    {
      numero: 1,
      nombre: 'Integrante 1',
      carrera: 'Ingeniería de Sistemas',
      especialidad: 'Frontend y Routing',
      dni: '12345678'
    },
    {
      numero: 2,
      nombre: 'Integrante 2',
      carrera: 'Ingeniería de Sistemas',
      especialidad: 'Formularios y Validaciones',
      dni: '87654321'
    },
    {
      numero: 3,
      nombre: 'Integrante 3',
      carrera: 'Ingeniería de Sistemas',
      especialidad: 'Servicios REST y APIs',
      dni: '11223344'
    },
    {
      numero: 4,
      nombre: 'Integrante 4',
      carrera: 'Ingeniería de Sistemas',
      especialidad: 'Consultas y Búsquedas',
      dni: '55667788'
    },
    {
      numero: 5,
      nombre: 'Integrante 5',
      carrera: 'Ingeniería de Sistemas',
      especialidad: 'Diseño UI/UX y Bootstrap',
      dni: '99001122'
    }
  ];

  // Tecnologías utilizadas
  tecnologias = [
    {
      nombre: 'Angular 20',
      descripcion: 'Framework principal para la aplicación',
      icono: 'code-square',
      version: '20.0.0'
    },
    {
      nombre: 'Bootstrap 5',
      descripcion: 'Framework CSS para diseño responsivo',
      icono: 'bootstrap',
      version: '5.3.0'
    },
    {
      nombre: 'TypeScript',
      descripcion: 'Lenguaje de programación',
      icono: 'filetype-tsx',
      version: '5.5.0'
    },
    {
      nombre: 'JSON Server',
      descripcion: 'Base de datos simulada para desarrollo',
      icono: 'database',
      version: '0.17.4'
    },
    {
      nombre: 'RxJS',
      descripcion: 'Librería para programación reactiva',
      icono: 'lightning',
      version: '7.8.0'
    },
    {
      nombre: 'Bootstrap Icons',
      descripcion: 'Iconos para la interfaz',
      icono: 'icons',
      version: '1.11.0'
    }
  ];

  // Características del proyecto
  caracteristicas = [
    'Componentes Standalone de Angular 20',
    'Routing y navegación fluida',
    'Formularios reactivos con validaciones',
    'Servicios REST con HttpClient',
    'Base de datos simulada con JSON Server',
    'Interfaz responsiva con Bootstrap',
    'Búsquedas y filtros avanzados',
    'CRUD completo (Crear, Leer, Actualizar, Eliminar)',
    'Exportación de datos a CSV',
    'Impresión de reportes',
    'Diseño moderno y profesional',
    'Código comentado y fácil de entender'
  ];
}
