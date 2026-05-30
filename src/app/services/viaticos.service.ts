// Servicio de Viáticos - Maneja peticiones CRUD para viáticos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viatico } from '../interfaces/viatico.interface';

@Injectable({
  providedIn: 'root'
})
export class ViaticosService {
  // URL base del servidor JSON Server
  private apiUrl = 'http://localhost:3000/viaticos';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los viáticos registrados
   * @returns Observable con la lista de viáticos
   */
  obtener(): Observable<Viatico[]> {
    return this.http.get<Viatico[]>(this.apiUrl);
  }

  /**
   * Obtiene un viático por ID
   * @param id - ID del viático
   * @returns Observable con el viático encontrado
   */
  obtenerPorId(id: number): Observable<Viatico> {
    return this.http.get<Viatico>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene viáticos por DNI del colaborador
   * @param dni - DNI del colaborador
   * @returns Observable con los viáticos del colaborador
   */
  obtenerPorDni(dni: string): Observable<Viatico[]> {
    return this.http.get<Viatico[]>(`${this.apiUrl}?dni=${dni}`);
  }

  /**
   * Guarda un nuevo viático
   * @param viatico - Datos del viático a guardar
   * @returns Observable con el viático creado
   */
  guardar(viatico: Viatico): Observable<Viatico> {
    return this.http.post<Viatico>(this.apiUrl, viatico);
  }

  /**
   * Actualiza un viático existente
   * @param id - ID del viático
   * @param viatico - Datos actualizados del viático
   * @returns Observable con el viático actualizado
   */
  actualizar(id: number, viatico: Viatico): Observable<Viatico> {
    return this.http.put<Viatico>(`${this.apiUrl}/${id}`, viatico);
  }

  /**
   * Elimina un viático
   * @param id - ID del viático a eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
