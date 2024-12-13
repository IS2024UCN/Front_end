import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'auth-worker-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './worker-register.component.html',
  styleUrl: './worker-register.component.css',
  providers: [AuthServiceService]
})
export class WorkerRegisterComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  good: boolean = false;
  message: string[] = [];

  private authService = inject(AuthServiceService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get rutValidate() {
    return this.form.get('rut')?.invalid && this.form.get('rut')?.touched;
  }

  get nameValidate() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  get last_nameValidate() {
    return this.form.get('last_name')?.invalid && this.form.get('last_name')?.touched;
  }

  get phoneValidate() {
    return this.form.get('phone')?.invalid && this.form.get('phone')?.touched;
  }

  validateRut(rut: string): boolean {
    if (!rut || rut.length < 8 || rut.length > 10) {
      return false;
    }

    rut = rut.replace(/\./g, '').replace('-', '');
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const mod11 = 11 - (sum % 11);
    const expectedDv = mod11 === 11 ? '0' : mod11 === 10 ? 'K' : mod11.toString();

    return dv === expectedDv;
  }

  async register() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const rut = this.form.get('rut')?.value;
    if (!this.validateRut(rut)) {
      this.error = true;
      this.errorMessage.push('RUT inválido');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
      return;
    }

    this.loginAlert = true;

    try {
      const response = await this.authService.workerRegister(this.form.value);

      if (response.error === false) {
        this.good = true;
        this.message.push('Trabajador registrado correctamente');

        setTimeout(() => {
          this.good = false;
          this.message = [];
          this.router.navigate(['/administrador']);
        }, 3000);
      } else {
        this.error = true;
        this.errorMessage.push(response.message || 'Error de registro');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      this.error = true;
      this.errorMessage.push('Error al registrar trabajador, intente nuevamente.');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
    }
  }

  goBack() {
    this.router.navigate(['/administrador']);
  }
}
