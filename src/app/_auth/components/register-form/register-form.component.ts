import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  roles: string[] = ['cliente', 'administrador', 'trabajador', 'NA'];
  errorMessage: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', [Validators.required, this.validateRole.bind(this)]]
    });
  }

  validateRole(control: any): { [key: string]: boolean } | null {
    if (this.roles.indexOf(control.value) === -1) {
      return { invalidRole: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage = [];
      if (this.form.controls['correo'].hasError('email')) {
        this.errorMessage.push('Correo no válido');
      }
      if (this.form.controls['rol'].hasError('invalidRole')) {
        this.errorMessage.push('Rol no válido');
      }
      return;
    }

    // Aquí puedes manejar el envío del formulario
    console.log('Formulario válido', this.form.value);
  }
}