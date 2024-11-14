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

        this.Router.navigate(['/login']);
      } else{
        console.log('Error en el componente del register [Register Form]: ', response);
        this.error = true;
        this.errorMessage.push('Error de registro');
      }

    } catch (error) {
      console.log('Error en el componente del register [Register Form]: ', error);
      this.error = true;
      this.errorMessage.push('Error de registro en el formulario');
    }
  }

  goToLogin() {
    this.Router.navigate(['/login']);
  }
}