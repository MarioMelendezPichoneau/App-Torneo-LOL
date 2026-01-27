import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, LoadingController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService, EmailData } from 'src/app/services/email.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.page.html',
  styleUrls: ['./inscripcion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class InscripcionPage implements OnInit {

  inscripcionForm: FormGroup;
  isSubmitting = false;
  plataformaNativa = false;

  // Rangos de LOL para validación dinámica
  elos = [
    { valor: 'Hierro', label: 'Hierro' },
    { valor: 'Bronce', label: 'Bronce' },
    { valor: 'Plata', label: 'Plata' },
    { valor: 'Oro', label: 'Oro' },
    { valor: 'Platino', label: 'Platino' },
    { valor: 'Diamante', label: 'Diamante' },
    { valor: 'Maestro', label: 'Maestro' },
    { valor: 'Gran Maestro', label: 'Gran Maestro' },
    { valor: 'Challenger', label: 'Challenger' }
  ];

  posiciones = [
    { valor: 'Top', icon: 'shield' },
    { valor: 'Jungla', icon: 'footsteps' },
    { valor: 'Mid', icon: 'flash' },
    { valor: 'ADC', icon: 'bow-arrow' },
    { valor: 'Support', icon: 'heart' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private emailService: EmailService,
    private platform: Platform
  ) {
    this.inscripcionForm = this.formBuilder.group({
      invocador: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      elo: ['', Validators.required],
      division: ['IV', Validators.required], // Default IV
      posicion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
    
    this.plataformaNativa = this.platform.is('hybrid');
  }

  ngOnInit() {}

  get f() { return this.inscripcionForm.controls; }

  async onSubmit() {
    if (this.inscripcionForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    
    const loading = await this.loadingController.create({
      message: 'Enviando inscripción...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      const formData: EmailData = this.inscripcionForm.value;
      const resultado = await this.emailService.enviarInscripcion(formData);
      
      await loading.dismiss();
      
      if (resultado.success) {
        await this.mostrarAlertaExito(resultado.message);
        this.inscripcionForm.reset({ division: 'IV' }); // Reset con default
        this.router.navigate(['/home']);
      } else {
        await this.mostrarAlertaError(resultado.message);
      }
    } catch (error) {
      await loading.dismiss();
      await this.mostrarAlertaError('Error inesperado. Inténtalo nuevamente.');
      console.error(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  async mostrarAlertaExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡Inscripción Exitosa! 🎮',
      message: mensaje,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']);
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }

  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error ❌',
      message: mensaje,
      buttons: ['Entendido'],
      cssClass: 'alert-error'
    });
    await alert.present();
  }
}