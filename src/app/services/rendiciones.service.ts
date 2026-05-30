// Servicio de Rendiciones - Maneja peticiones CRUD para rendiciones de cuentas
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rendicion } from '../interfaces/rendicion.interface';

@Injectable({
  providedIn: 'root'
})
export class RendicionesService {
  // URL base del servidor JSON Server
  private apiUrl = 'http://localhost:3000/rendiciones';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las rendiciones de cuentas
   * @returns Observable con la lista de rendiciones
   */
  obtener(): Observable<Rendicion[]> {
    return this.http.get<Rendicion[]>(this.apiUrl);
  }

  /**
   * Obtiene una rendición por ID
   * @param id - ID de la rendición
   * @returns Observable con la rendición encontrada
   */
  obtenerPorId(id: number): Observable<Rendicion> {
    return this.http.get<Rendicion>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene rendiciones por DNI del colaborador
   * @param dni - DNI del colaborador
   * @returns Observable con las rendiciones del colaborador
   */
  obtenerPorDni(dni: string): Observable<Rendicion[]> {
    return this.http.get<Rendicion[]>(`${this.apiUrl}?dni=${dni}`);
  }

  /**
   * Obtiene rendiciones por dependencia
   * @param dependencia - Nombre de la dependencia
   * @returns Observable con las rendiciones de esa dependencia
   */
  obtenerPorDependencia(dependencia: string): Observable<Rendicion[]> {
    return this.http.get<Rendicion[]>(`${this.apiUrl}?dependencia=${dependencia}`);
  }

  /**
   * Guarda una nueva rendición
   * @param rendicion - Datos de la rendición a guardar
   * @returns Observable con la rendición creada
   */
  guardar(rendicion: Rendicion): Observable<Rendicion> {
    return this.http.post<Rendicion>(this.apiUrl, rendicion);
  }

  /**
   * Actualiza una rendición existente
   * @param id - ID de la rendición
   * @param rendicion - Datos actualizados de la rendición
   * @returns Observable con la rendición actualizada
   */
  actualizar(id: number, rendicion: Rendicion): Observable<Rendicion> {
    return this.http.put<Rendicion>(`${this.apiUrl}/${id}`, rendicion);
  }

  /**
   * Elimina una rendición
   * @param id - ID de la rendición a eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
