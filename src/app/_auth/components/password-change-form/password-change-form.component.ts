import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-password-change-form',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.css',
})
export class PasswordChangeFormComponent implements OnInit {
  passwordChangeForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private Router: Router) {}

  ngOnInit(): void {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
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

  onSubmit(): void {
    if (this.passwordChangeForm.valid && !this.passwordMismatch) {
      const { currentPassword, newPassword } = this.passwordChangeForm.value;
      console.log('Contraseña actual:', currentPassword);
      console.log('Nueva contraseña:', newPassword);

      // Aquí puedes implementar la lógica para cambiar la contraseña.
      alert('Contraseña cambiada exitosamente.');
    } else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  goBack(): void {
    // Redirigir a la página anterior
    this.Router.navigate(['/cliente']);
  }
}
