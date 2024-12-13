import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-product-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-register-form.component.html',
  styleUrl: './product-register-form.component.css',
  providers: [AuthServiceService],
})
export class ProductRegisterFormComponent {
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
      title: ['', [Validators.required]],
      creator: ['', [Validators.required]],
      rental_price: ['', [Validators.required, Validators.min(0.01)]],
      publisher: ['', [Validators.required, Validators.minLength(10)]], // Validar más de 10 caracteres
      release_date: ['', [Validators.required]],
      type: ['', [Validators.required, this.typeValidator]],
      ISBN: ['', [Validators.required, Validators.minLength(10)]], // Validar 10 caracteres mínimo
      initial_stock: ['', [Validators.required, Validators.min(1)]],
      
    });
  }

  // Método personalizado para validar el campo "type"
  typeValidator(control: any): { [key: string]: any } | null {
    const validTypes = ['libro', 'pelicula'];
    if (validTypes.includes(control.value?.toLowerCase())) {
      return null;
    }
    return { invalidType: true };
  }

  async onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.loginAlert = true;

    try {
      const response = await this.authService.productRegister(this.form.value);

      if (!response.error) {
        this.good = true;
        this.message.push(response.message || 'Producto registrado correctamente');
        this.form.reset();
        setTimeout(() => {
          this.good = false;
          this.message = [];
          this.router.navigate(['/trabajador/dashboard']);
        }, 3000);
      } else {
        console.error('Error en el registro del producto: ', response);
        this.error = true;
        this.errorMessage.push(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      this.error = true;
      this.errorMessage.push((error as any).message || 'Error en el registro del producto');
      setTimeout(() => {
        this.error = false;
        this.errorMessage = [];
      }, 3000);
    } finally {
      this.loginAlert = false;
    }
  }

  // Getters para mostrar mensajes de validación
  get titleValidate() {
    return this.form.get('title')?.invalid && this.form.get('title')?.touched;
  }

  get creatorValidate() {
    return this.form.get('creator')?.invalid && this.form.get('creator')?.touched;
  }

  get rentalPriceValidate() {
    return this.form.get('rental_price')?.invalid && this.form.get('rental_price')?.touched;
  }

  get releaseDateValidate() {
    return this.form.get('release_date')?.invalid && this.form.get('release_date')?.touched;
  }

  get typeValidate() {
    return this.form.get('type')?.invalid && this.form.get('type')?.touched;
  }

  get ISBNValidate() {
    return (
      this.form.get('ISBN')?.invalid &&
      this.form.get('ISBN')?.touched &&
      this.form.get('ISBN')?.errors?.['minlength']
    );
  }

  get publisherValidate() {
    return (
      this.form.get('publisher')?.invalid &&
      this.form.get('publisher')?.touched &&
      this.form.get('publisher')?.errors?.['minlength']
    );
  }

  get initialStockValidate() {
    return this.form.get('initial_stock')?.invalid && this.form.get('initial_stock')?.touched;
  }

  goBack() {
    this.router.navigate(['/trabajador/dashboard']);
  }
}







  

