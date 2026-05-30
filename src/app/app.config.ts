// app.config.ts - Configuración de la aplicación Angular
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

/**
 * Configuración de la aplicación Angular 20
 * Define proveedores globales para routing, HTTP, animaciones, etc.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Proveedor de rutas
    provideRouter(routes),
    // Proveedor de HTTP Client para peticiones REST
    provideHttpClient(),
    // Proveedor de animaciones
    provideAnimations()
  ]
};
