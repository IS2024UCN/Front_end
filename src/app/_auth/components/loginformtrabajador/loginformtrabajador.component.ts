import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { time } from 'console';
import { timer } from 'rxjs';

@Component({
  selector: 'auth-loginformtrabajador',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './loginformtrabajador.component.html',
  styleUrl: './loginformtrabajador.component.css',
  providers: [AuthServiceService]
})
export class LoginformtrabajadorComponent {

  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];
  good: boolean = false;
  message: string[] = [];


  private authService = inject(AuthServiceService);

  constructor(private fb: FormBuilder, private Router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
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
      const response = await this.authService.register(this.form.value);

      if (response.error === false){

        this.Router.navigate(['/loginTrabajador']);


        this.error = true;

        
    
        this.message.push('Registro exitoso');
        setTimeout(() => {
          this.good = false;
          this.message = [];
      }, 3000);
        

      } else{
        console.log('Error en el componente del register [Register Form]: ', response);
        this.error = true;
        this.errorMessage.push('Error de registro');
      }

    } catch (error) {
      this.error = true;
      this.errorMessage.push('Error de registro en el formulario');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
    }
  }

  goBack() {
    this.Router.navigate(['/trabajador']);
  }


}
