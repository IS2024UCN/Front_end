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
      rental_price: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      release_date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      ISBN: ['', [Validators.required]],
      initial_stock: ['', [Validators.required]],
    });
  }

  onSubmit() {
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
  get initial_stockValidate() {
    return this.form.get('initial_stock')?.invalid && this.form.get('initial_stock')?.touched;
  }

  //validar que el precio no pueda ser negativo ni 0
  validatePrice(rental_price: number): boolean {
    if (rental_price <= 0) {
      return false;
    }
    return true;
  }

  //validar que el type solo puede ser libro o pelicula
  //validando todas las posibles opciones
  //validando tambien que se pueda escribir en mayusculas o minusculas en cualquier posicion. ej: PeLiCuLa
  validateType(type: string): boolean {
    if (type === 'libro' || type === 'pelicula' || type === 'Libro' || type === 'Pelicula' || type === 'LIBRO' || type === 'PELICULA' || type === 'LiBrO' || type === 'PeLiCuLa') {
      return true;
    }
    return false;
  }

  //Validar que el ISBN tenga minimo 10 digitos
  validateISBN(ISBN: string): boolean {
    if (ISBN.length < 10) {
      return false;
    }
    return true;
  }

  goBack() {
    this.router.navigate(['/trabajador/dashboard']);
  }

  







  
}
