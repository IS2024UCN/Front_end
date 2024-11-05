import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'auth-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],  // Cambia a "styleUrls"
  providers: [AuthServiceService]
})
export class LoginformComponent {

  form!: FormGroup;
  loginAlert: boolean = false;

  error: boolean = false;
  errorMessage: string[] = [];
  
  private authService = Inject(AuthServiceService);

  constructor(private fb: FormBuilder, private router: Router ) {
    this.formulario();
   }

   formulario(): void {
    this.form = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  async login(){
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return; 
    }
    this.loginAlert = true;

    try {
      const response = await this.authService.login(this.form.value);
      //TODO validar si el usuario existe en response
      if(response.data.user){
        this.authService.setClientLogger(response.data.user);
        this.router.navigate(['/']);
      }else{
        console.log('Error en ell complemento del login [Login Form]: ', response);
        this.error = true;
        this.errorMessage.push('Error de autenticación');
      }

      //TODO si el usuario no existe
      
    } catch (error) {
      this.error = true;
      this.errorMessage.push('Error al iniciar sesión');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}