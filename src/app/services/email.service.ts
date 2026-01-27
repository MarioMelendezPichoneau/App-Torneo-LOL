import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { EmailComposer } from 'capacitor-email-composer';

export interface EmailData {
  invocador: string;
  elo: string;
  division: string;
  posicion: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // correo de administrador
  private readonly ADMIN_EMAIL = 'mariomelendezpichoneau@gmail.com';



  constructor(private platform: Platform) { }

  async enviarInscripcion(data: EmailData): Promise<{success: boolean; message: string}> {
    try {
      if (this.platform.is('hybrid')) {
        // iOS/Android: Usar plugin nativo
        return await this.enviarNativo(data);
      } else {
        // Web: Fallback a mailto (limitado pero funcional)
        return this.enviarWeb(data);
      }
    } catch (error) {
      console.error('Error en envío de email:', error);
      return {
        success: false,
        message: 'No se pudo enviar la inscripción. Intenta nuevamente o contacta al administrador.'
      };
    }
  }

  private async enviarNativo(data: EmailData): Promise<{ success: boolean; message: string }> {
    const emailUsuario = {
      to: [data.correo],
      subject: 'Confirmación de Inscripción - Torneo LOL',
      body: this.generarTemplateUsuario(data),
      isHtml: true
    };

    const emailAdmin = {
      to: [this.ADMIN_EMAIL],
      subject: '🎮 Nueva Inscripción al Torneo',
      body: this.generarTemplateAdmin(data),
      isHtml: true
    };

    try {
      // Enviar al usuario
      await EmailComposer.open(emailUsuario);

      // Pequeña pausa para evitar conflictos en iOS
      await this.delay(500);

      // Enviar al admin
      await EmailComposer.open(emailAdmin);

      return { success: true, message: 'Correos enviados correctamente' };
    } catch (error) {
      throw error;
    }
  }

  private enviarWeb(data: EmailData): { success: boolean; message: string } {
    // Fallback para web: abrir cliente de correo predeterminado
    const subject = encodeURIComponent('Inscripción Torneo LOL');
    const body = encodeURIComponent(this.generarTemplateSimple(data));
    const mailtoLink = `mailto:${this.ADMIN_EMAIL}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, '_blank');

    return {
      success: true,
      message: 'Se abrió tu cliente de correo. Por favor envía el mensaje para completar la inscripción.'
    };
  }

  private generarTemplateUsuario(data: EmailData): string {
    return `
      <h2>¡Hola ${data.invocador}!</h2>
      <p>Tu inscripción al torneo de League of Legends ha sido recibida.</p>
      <h3>Detalles:</h3>
      <ul>
        <li><strong>Invocador:</strong> ${data.invocador}</li>
        <li><strong>ELO:</strong> ${data.elo}</li>
        <li><strong>División:</strong> ${data.division}</li>
        <li><strong>Posición:</strong> ${data.posicion}</li>
      </ul>
      <p>¡Nos vemos en la Grieta del Invocador!</p>
    `;
  }

  private generarTemplateAdmin(data: EmailData): string {
    return `
      <h3>Nueva Inscripción Recibida</h3>
      <ul>
        <li><strong>Invocador:</strong> ${data.invocador}</li>
        <li><strong>ELO:</strong> ${data.elo} ${data.division}</li>
        <li><strong>Posición:</strong> ${data.posicion}</li>
        <li><strong>Contacto:</strong> ${data.correo}</li>
      </ul>
    `;
  }

  private generarTemplateSimple(data: EmailData): string {
    return `Nueva inscripción:
Invocador: ${data.invocador}
ELO: ${data.elo} ${data.division}
Posición: ${data.posicion}
Correo: ${data.correo}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
