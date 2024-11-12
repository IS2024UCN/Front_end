import { Component, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
import { LocalStorageService } from '../../../_shared/service/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginformComponent],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
  exportAs: 'LoginComponent',
  providers: [AuthServiceService, LocalStorageService]
})

export class LoginformComponent {

  form!: FormGroup;
  loginAlert: boolean = false;

  error: boolean = false;
  errorMessage: string[] = [];
  
  private authService = Inject(AuthServiceService);
  private localStorageService = Inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router ) {

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
        this.localStorageService.setClientLogger(response.data.user);
        this.localStorageService.setToken(response.data.token);
        //Implementar que sea un cliente rediriga a la pagina cliente
        //Implementar que sea un trabajador rediriga a la pagina trabajador
        //implementar que sea un admin rediriga a la pagina admin
        if(response.data.user.role == 'admin'){
          this.router.navigate(['/admin/dashboard']);
        }
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
  register (): void {
    this.router.navigate(['/register']);
  }

}