// Servicio de Comisiones - Maneja peticiones CRUD para papeletas de comisión
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comision } from '../interfaces/comision.interface';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  // URL base del servidor JSON Server
  private apiUrl = 'http://localhost:3000/comisiones';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las comisiones registradas
   * @returns Observable con la lista de comisiones
   */
  obtener(): Observable<Comision[]> {
    return this.http.get<Comision[]>(this.apiUrl);
  }

  /**
   * Obtiene una comisión por ID
   * @param id - ID de la comisión
   * @returns Observable con la comisión encontrada
   */
  obtenerPorId(id: number): Observable<Comision> {
    return this.http.get<Comision>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene comisiones por DNI del colaborador
   * @param dni - DNI del colaborador
   * @returns Observable con las comisiones del colaborador
   */
  obtenerPorDni(dni: string): Observable<Comision[]> {
    return this.http.get<Comision[]>(`${this.apiUrl}?dni=${dni}`);
  }

  /**
   * Guarda una nueva comisión
   * @param comision - Datos de la comisión a guardar
   * @returns Observable con la comisión creada
   */
  guardar(comision: Comision): Observable<Comision> {
    return this.http.post<Comision>(this.apiUrl, comision);
  }

  /**
   * Actualiza una comisión existente
   * @param id - ID de la comisión
   * @param comision - Datos actualizados de la comisión
   * @returns Observable con la comisión actualizada
   */
  actualizar(id: number, comision: Comision): Observable<Comision> {
    return this.http.put<Comision>(`${this.apiUrl}/${id}`, comision);
  }

  /**
   * Elimina una comisión
   * @param id - ID de la comisión a eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
