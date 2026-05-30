// Servicio de Colaborador - Maneja peticiones CRUD para colaboradores
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../interfaces/colaborador.interface';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  // URL base del servidor JSON Server
  private apiUrl = 'http://localhost:3000/colaboradores';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los colaboradores
   * @returns Observable con la lista de colaboradores
   */
  obtener(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl);
  }

  /**
   * Obtiene un colaborador por ID
   * @param id - ID del colaborador
   * @returns Observable con el colaborador encontrado
   */
  obtenerPorId(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene un colaborador por DNI
   * @param dni - DNI del colaborador
   * @returns Observable con el colaborador encontrado
   */
  obtenerPorDni(dni: string): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.apiUrl}?dni=${dni}`);
  }

  /**
   * Guarda un nuevo colaborador
   * @param colaborador - Datos del colaborador a guardar
   * @returns Observable con el colaborador creado
   */
  guardar(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador);
  }

  /**
   * Actualiza un colaborador existente
   * @param id - ID del colaborador
   * @param colaborador - Datos actualizados del colaborador
   * @returns Observable con el colaborador actualizado
   */
  actualizar(id: number, colaborador: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.apiUrl}/${id}`, colaborador);
  }

  /**
   * Elimina un colaborador
   * @param id - ID del colaborador a eliminar
   * @returns Observable con la respuesta del servidor
   */
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
