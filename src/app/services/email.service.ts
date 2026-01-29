import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  invocador: string;
  elo: string;
  division: string;
  posicion: string;
  correo: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private API_URL = 'https://loldominicana.com/api/inscripcion.php';

  constructor(private http: HttpClient) {}

  enviarInscripcion(data: EmailData): Observable<ApiResponse> {
    const form = new FormData();
    form.append('invocador', data.invocador);
    form.append('elo', data.elo);
    form.append('division', data.division);
    form.append('posicion', data.posicion);
    form.append('correo', data.correo);

    // OJO: NO pongas Content-Type manual con FormData
    // el navegador lo genera con boundary automáticamente.
    return this.http.post<ApiResponse>(this.API_URL, form);
  }
}