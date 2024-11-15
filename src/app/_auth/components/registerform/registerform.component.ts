import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'auth-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css',
  providers: [AuthServiceService]
})
export class RegisterFormComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  Message: string[] = [];

  private authService = inject(AuthServiceService);

  constructor(private fb: FormBuilder, private Router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required]],
      phone: ['', [Validators.required]]
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
    return this.form.get('phone')?.invalid && this.form.get('telefono')?.touched;
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
    this.loginAlert = true;
    try {

      console.log('errorAqui');
      const response = await this.authService.register(this.form.value);

      if (response.error === false){

        this.Message.push('Registro exitoso');
        this.Router.navigate(['/login']);
      } else{
        console.log('Error en el componente del register [Register Form]: ', response);
        this.error = true;
        this.errorMessage.push('Error de registro');
      }

    } catch (error) {
      //aaaaaaaaaaaaaaaa
      
    if (this.form.get('name')?.value.length < 3 || this.form.get('last_name')?.value.length < 3) {
      this.error = true;
      this.errorMessage.push('Los nombres o apellidos deben tener más de 2 caracteres');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
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

    const phone = this.form.get('phone')?.value;
    if (phone.length !== 9) {
      this.error = true;
      this.errorMessage.push('El teléfono móvil ingresado no es válido');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
      return;
    }

    const email = this.form.get('email')?.value;
    if (!email.includes('@') || email.indexOf('@') === 0 || email.indexOf('@') === email.length - 1) {
      this.error = true;
      this.errorMessage.push('Su correo electrónico no es válido');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
      return;
    }

    
      //aaaaaaaaaaaaaaaa
      console.log('Error en el componente del register [Register Form]: ', error);
      this.error = true;
      this.errorMessage.push('Error al registro en el formulario');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
    }
  }

  goToLogin() {
    this.Router.navigate(['/login']);
  }
}