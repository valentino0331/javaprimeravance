// app.routes.ts - Definición de rutas de la aplicación
import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PlanillaViaticosComponent } from './components/planilla-viaticos/planilla-viaticos.component';
import { PapeletaComisionComponent } from './components/papeleta-comision/papeleta-comision.component';
import { RendicionCuentasComponent } from './components/rendicion-cuentas/rendicion-cuentas.component';
import { ConsultaRendicionesComponent } from './components/consulta-rendiciones/consulta-rendiciones.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';

/**
 * Rutas de la aplicación
 * Define el mapeo entre URLs y componentes
 */
export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    data: { title: 'Inicio' }
  },
  {
    path: 'planilla',
    component: PlanillaViaticosComponent,
    data: { title: 'Planilla de Viáticos' }
  },
  {
    path: 'papeleta',
    component: PapeletaComisionComponent,
    data: { title: 'Papeleta de Comisión' }
  },
  {
    path: 'rendicion',
    component: RendicionCuentasComponent,
    data: { title: 'Rendición de Cuentas' }
  },
  {
    path: 'consulta',
    component: ConsultaRendicionesComponent,
    data: { title: 'Consulta de Rendiciones' }
  },
  {
    path: 'acerca',
    component: AcercaDeComponent,
    data: { title: 'Acerca de' }
  },
  // Ruta comodín para página no encontrada
  {
    path: '**',
    redirectTo: ''
  }
];
