import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'auth-password-change-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css'],
  providers: [AuthServiceService],
})
export class PasswordChangeFormComponent implements OnInit {
  passwordChangeForm!: FormGroup;
  errorMessage: string[] = [];
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator }); // Agregar validador global
  }

  // Validación global para que newPassword y confirmPassword coincidan
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  async onSubmit() {
    if (this.passwordChangeForm.invalid) {
      Object.values(this.passwordChangeForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    try {
      const { currentPassword, newPassword } = this.passwordChangeForm.value;
      const response = await this.authService.changePassword({ currentPassword, newPassword });

      if (!response.error) {
        this.successMessage = 'Contraseña cambiada exitosamente';
      } else {
        this.errorMessage.push(response.details || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña', error);
      this.errorMessage.push('Hubo un error al cambiar la contraseña');
    }
  }

  goBack(): void {
    this.router.navigate(['/cliente']);
  }
}
