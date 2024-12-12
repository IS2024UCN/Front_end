import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { FormsModule } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {
    // Obtener la lista de productos al inicializar el componente
    this.authService
      .getProducts()
      .then((data: any) => {
        console.log('Data: ', data);
        this.products = data.data;
        this.filteredProducts = this.products; // Inicializa la lista filtrada con todos los productos
      })
      .catch((error: any) => {
        console.error('Error fetching products:', error);
      });
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