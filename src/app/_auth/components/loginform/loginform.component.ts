import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../_shared/service/local-storage.service';
import { response } from 'express';

@Component({
  selector: 'auth-loginform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],  // Cambia a "styleUrls"
  providers: [AuthServiceService, LocalStorageService]
})
export class LoginformComponent {


  form!: FormGroup;
  loginAlert: boolean = false;

  error: boolean = false;
  errorMessage: string[] = [];
  
  private authService = inject(AuthServiceService);
  private localStorageService = inject(LocalStorageService);

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
      console.log("errorAqui");
      const response = await this.authService.login(this.form.value);
      //TODO validar si el usuario existe en response
      if(response.data.user){
        this.localStorageService.setClientLogger(response.data.user);
        this.localStorageService.setToken(response.data.token);
        //TODO implementar que es admin y redirecciona al admin
        if(response.data.user.role_id == 1){
          this.router.navigate(['/cliente/dashboard']);
          return;
        }
        if(response.data.user.role_id == 2){
          this.router.navigate(['/administrador/dashboard']);
          return;
        }
        if(response.data.user.role_id == 3){
          this.router.navigate(['/trabajador/dashboard']);
          return;
        }
        //TODO implemnetar que es worker y redirecciona al worker
      }else{
        console.log('Error en el complemento del login [Login Form]: ', response);
        this.error = true;
        this.errorMessage.push('Error de autenticación');
      }

      //TODO si el usuario no existe
      
    } catch (error) {

      this.error = true;
      //ocultar el mensaje despues de 3 segundos
      this.errorMessage.push('Las credenciales de acceso son incorrectas o el usuario no está registrado en el sistema');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
      
      
      console.log('Error en el complemento del login [Login Form]: ', error);
      this.error = true;
      //ocultar el mensaje despues de 3 segundos
      
    
      
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}