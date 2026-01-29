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

  // url de la api
  private API_URL = 'https://loldominicana.com/api/inscripcion.php';

  constructor(private http: HttpClient) {}

  async enviarInscripcion(data: EmailData): Promise<ApiResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(data)
      })

      const result = await response.json();
      return result;

    } catch (error) {
      console.error('Error al enviar la inscripción:', error);
      return { success: false, message: 'No se pudo conectar con el servidor.' };
      throw error;
    }
   
    // OJO: NO pongas Content-Type manual con FormData
    // el navegador lo genera con boundary automáticamente.
    //return this.http.post<ApiResponse>(this.API_URL, formData);
  }
}