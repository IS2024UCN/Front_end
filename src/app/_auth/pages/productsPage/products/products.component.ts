import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [AuthServiceService]
})
export class ProductsComponent implements OnInit {
  authService = inject(AuthServiceService);
  products: any[] = []; // Lista original de productos
  filteredProducts: any[] = []; // Lista filtrada que se muestra en la tabla
  searchTerm: string = ''; // Almacena el término de búsqueda del usuario

  

  constructor(private router:Router) {}

  loading: boolean = true;

  ngOnInit(): void {
    this.authService
    .getProducts()
    .then((data: any) => {
      console.log('Data: ', data);
      this.products = data.data;
      this.filteredProducts = this.products;
      this.loading = false; // Datos cargados, cambia el estado
    })
    .catch((error: any) => {
      console.error('Error fetching products:', error);
      this.loading = false; // Cargar siempre el estado de "loading" en caso de error también
    });
}

  enableEditPrice(product: any): void {
    product.editingPrice = true;
    product.originalPrice = product.rental_price;  // Guarda el precio original
  }

  enableEditStock(product: any): void {
    if (product.available_stock === 0) {
      product.editingStock = true;
      product.originalStock = product.available_stock;
    } 
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.creator.toLowerCase().includes(searchTerm) ||
      product.ISBN.toLowerCase().includes(searchTerm)
    );
  }

  savePrice(product: any): void {
    const isbn = product.ISBN;
    const newPrice = product.rental_price;
  
    this.authService.updateProductPrice(isbn, newPrice).subscribe({
      next: (response) => {
        console.log('Precio actualizado en el backend:', response);
        product.editingPrice = false; // Salir del modo edición
        product.rental_price = response.data.rental_price;  // Actualiza el precio localmente
      },
      error: (err) => {
        console.error('Error al actualizar el precio:', err);
        alert('Hubo un error al actualizar el precio. Por favor, inténtalo nuevamente.');
      }
    });
  }

  saveStock(product: any): void {
    const isbn = product.ISBN;
    const newStock = product.available_stock;
  
    this.authService.replenishStock(isbn, newStock).subscribe({
      next: (response) => {
        console.log('Stock actualizado en el backend:', response);
        product.editingStock = false; // Salir del modo edición
        product.available_stock = response.data.available_stock;  // Actualiza el stock localmente
      },
      error: (err) => {
        console.error('Error al actualizar el stock:', err);
        alert('Hubo un error al actualizar el stock. Por favor, inténtalo nuevamente.');
      }
    });
  }
  

  cancelEditPrice(product: any): void {
    product.editingPrice = false;
    product.rental_price = product.originalPrice; // Restaurar el precio original
  }

  cancelEditStock(product: any): void {
    product.editingStock = false;
    product.available_stock = product.originalStock; // Restaurar el stock original
  }

  goBack(): void {
    this.router.navigate(['/trabajador/dashboard']); 
  }

  /**
   * Filtra los productos según el término ingresado en la barra de búsqueda.
   */
  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.ISBN.toLowerCase().includes(term) ||
      product.title.toLowerCase().includes(term) ||
      product.creator.toLowerCase().includes(term)
    );
  }
}