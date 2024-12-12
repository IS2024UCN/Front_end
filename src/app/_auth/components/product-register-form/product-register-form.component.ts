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
      publisher: ['', [Validators.required]],
      release_date: ['', [Validators.required]],
      type: ['', [Validators.required, this.typeValidator]],
      ISBN: ['', [Validators.required, Validators.minLength(10)]],
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
  
      // Verificar si la respuesta indica éxito
      if (!response.error) {
        this.good = true;
        this.message.push(response.message || 'Producto registrado correctamente');
  
        // Limpiar el formulario después del registro exitoso
        this.form.reset();
  
        // Mostrar el mensaje durante 3 segundos antes de la redirección
        setTimeout(() => {
          this.good = false;
          this.message = [];
          // Redirigir a la ruta de dashboard para trabajadores
          this.router.navigate(['/trabajador/dashboard']); 
        }, 3000); // Esperar 3 segundos para mostrar el mensaje
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
    return this.form.get('ISBN')?.invalid && this.form.get('ISBN')?.touched;
  }

  get publisherValidate() {
    return this.form.get('publisher')?.invalid && this.form.get('publisher')?.touched;
  }

  get initialStockValidate() {
    return this.form.get('initial_stock')?.invalid && this.form.get('initial_stock')?.touched;
  }

  goBack() {
    this.router.navigate(['/trabajador/dashboard']);
  }
}







  

