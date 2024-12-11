import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { LocalStorageService } from '../../../_shared/service/local-storage.service';

@Component({
  selector: 'auth-password-change-form',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.css',
})
export class PasswordChangeFormComponent implements OnInit {
  passwordChangeForm: FormGroup = this.fb.group({});

  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  constructor(private fb: FormBuilder, private Router: Router) {}
  
  private authService = inject(AuthServiceService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get currentPassword() {
    return this.passwordChangeForm.get('currentPassword')?.invalid && this.passwordChangeForm.get('currentPassword')?.touched;
  }

  get newPassword() {
    return this.passwordChangeForm.get('newPassword')?.invalid && this.passwordChangeForm.get('newPassword')?.touched;
  }

  get confirmPassword() {
    return this.passwordChangeForm.get('confirmPassword')?.invalid && this.passwordChangeForm.get('confirmPassword')?.touched;
  }

  get passwordMismatch(): boolean {
    return (
      this.passwordChangeForm.get('newPassword')?.value !==
      this.passwordChangeForm.get('confirmPassword')?.value
    );
  }

  

  async ChangePassword() {

    if (this.passwordChangeForm.invalid) {
      Object.values(this.passwordChangeForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    this.loginAlert = true;
    try {
      const response = await this.authService.changePassword(this.passwordChangeForm.value);
      if (response.data.user.password) {
        if (response.data.user.password == this.passwordChangeForm.value.currentPassword) {
          this.localStorageService.setPasswd(this.passwordChangeForm.value.newPassword);
          alert('Contraseña cambiada exitosamente.');
        }
      } else {
        alert('Error al cambiar la contraseña.');
      }
    } catch (error) {
      this.error = true;
      this.errorMessage.push('Error al cambiar la contraseña');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
      console.log('Error en el complemento del login [Login Form]: ', error);
    }

    // Aquí puedes implementar la lógica para cambiar la contraseña.
    alert('Contraseña cambiada exitosamente.');
  }

  goBack(): void {
    // Redirigir a la página anterior
    this.Router.navigate(['/cliente']);
  }
}
