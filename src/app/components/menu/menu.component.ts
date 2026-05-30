// Componente Menu - Navbar responsivo con navegación principal
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  // Controla si el menú responsivo está abierto
  menuAbierto = false;

  /**
   * Alterna la visibilidad del menú en dispositivos móviles
   */
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  /**
   * Cierra el menú al hacer clic en un enlace
   */
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
