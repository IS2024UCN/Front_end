import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'auth-password-change-form',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.css',
})
export class PasswordChangeFormComponent implements OnInit {
  passwordChangeForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private Router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get currentPassword() {
    return this.passwordChangeForm.get('currentPassword');
  }

  get newPassword() {
    return this.passwordChangeForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword');
  }

  get passwordMismatch(): boolean {
    return (
      this.passwordChangeForm.get('newPassword')?.value !==
      this.passwordChangeForm.get('confirmPassword')?.value
    );
  }

  async onSubmit(): Promise<void> {
    if (this.passwordChangeForm.valid && !this.passwordMismatch) {
      const { currentPassword, newPassword } = this.passwordChangeForm.value;

      try {
        // Llamamos al servicio para cambiar la contraseña
        const response = await this.authService.updatePassword(currentPassword, newPassword);
        alert('Contraseña cambiada exitosamente.');
        // Redirigir si es necesario
        this.Router.navigate(['/cliente']);
      } catch (error) {
        // Si ocurre un error, mostrarlo al usuario
        const errorMessage = Array.isArray(error) ? error.join(', ') : 'Unknown error';
        alert('Error al cambiar la contraseña: ' + errorMessage);
      }
    } else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  }
  

  goBack(): void {
    // Redirigir a la página anterior
    this.Router.navigate(['/cliente']);
  }
}
