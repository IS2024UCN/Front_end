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
      price: ['', [Validators.required]],
      year: ['', [Validators.required]],
      type: ['', [Validators.required]],
      ISBN: ['', [Validators.required]]
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

  get priceValidate() {
    return this.form.get('price')?.invalid && this.form.get('price')?.touched;
  }

  get yearValidate() {
    return this.form.get('year')?.invalid && this.form.get('year')?.touched;
  }

  get typeValidate() {
    return this.form.get('type')?.invalid && this.form.get('type')?.touched;
  }

  get ISBNValidate() {
    return this.form.get('ISBN')?.invalid && this.form.get('ISBN')?.touched;
  }

  //validar que el precio no pueda ser negativo ni 0
  validatePrice(price: number): boolean {
    if (price <= 0) {
      return false;
    }
    return true;
  }

  //validar que el año sea mayor a 0
  validateYear(year: number): boolean {
    if (year <= 0) {
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
