import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  IonicModule,
  LoadingController,
  Platform
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService, EmailData } from 'src/app/services/email.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.page.html',
  styleUrls: ['./inscripcion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class InscripcionPage implements OnInit {

  inscripcionForm!: FormGroup;
  isSubmitting = false;
  plataformaNativa = false;

  elos = [
    { valor: 'Hierro', label: 'Hierro' },
    { valor: 'Bronce', label: 'Bronce' },
    { valor: 'Plata', label: 'Plata' },
    { valor: 'Oro', label: 'Oro' },
    { valor: 'Platino', label: 'Platino' },
    { valor: 'Diamante', label: 'Diamante' },
    { valor: 'Maestro', label: 'Maestro' },
    { valor: 'Gran Maestro', label: 'Gran Maestro' },
    { valor: 'Retador', label: 'Retador' }
  ];

  divisiones = [
    { valor: 'I', label: 'I' },
    { valor: 'II', label: 'II' },
    { valor: 'III', label: 'III' },
    { valor: 'IV', label: 'IV' }
  ];

  posiciones = [
    { valor: 'Top' },
    { valor: 'Jungla' },
    { valor: 'Mid' },
    { valor: 'ADC' },
    { valor: 'Support' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private emailService: EmailService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.inscripcionForm = this.fb.group({
      invocador: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      elo: ['', Validators.required],
      division: ['', Validators.required],
      posicion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });

    this.plataformaNativa = this.platform.is('hybrid');
  }

  get f() {
    return this.inscripcionForm.controls;
  }

  //  ESTE MÉTODO ERA EL QUE FALTABA
  async onSubmit() {
    if (this.inscripcionForm.invalid || this.isSubmitting) return;
  
    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Enviando inscripción...'
    });
    await loading.present();
  
    try {
      const formData: EmailData = this.inscripcionForm.value;
      console.log('FORM DATA 👉', formData);
  
      // 👇 AHORA ES AWAIT DIRECTO, no firstValueFrom ni subscribe
      const resultado = await this.emailService.enviarInscripcion(formData);
  
      await loading.dismiss();
  
      if (resultado.success) {
        await this.mostrarAlerta('¡Enviado! 🎉', resultado.message);
        this.inscripcionForm.reset();
      } else {
        await this.mostrarAlertaError(resultado.message);
      }
  
    } catch (error) {
      await loading.dismiss();
      console.error('ERROR 👉', error);
      await this.mostrarAlertaError('Error de conexión. Intenta nuevamente.');
    } finally {
      this.isSubmitting = false;
    }
  }


  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlertaError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}

