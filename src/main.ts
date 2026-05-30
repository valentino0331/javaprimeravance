// main.ts - Punto de entrada de la aplicación
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstrap de la aplicación
 * Inicia la aplicación Angular en el elemento root del index.html
 */
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
