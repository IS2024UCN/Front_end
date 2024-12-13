import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../_auth/service/auth-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers : [AuthServiceService]
})

export class DashboardComponent {
  placeholders = Array(9).fill(null);
  authService = inject(AuthServiceService);
  products: any[] = []; // Lista original de productos
  filteredProducts: any[] = []; // Lista filtrada que se muestra en la tabla
  
  selectedProduct: string | null = null;

  constructor(private router: Router) {} 

  menuOpen = false;
  rightMenuOpen = false;

  ngOnInit(): void {
    // Obtener la lista de productos al inicializar el componente
    this.authService
      .getProducts()
      .then((data: { data: any[] }) => {
        console.log('Data: ', data);
        this.products = data.data;
        this.filteredProducts = this.products; // Inicializa la lista filtrada con todos los productos
      })
      .catch((error: any) => {
        console.error('Error fetching products:', error);
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleRightMenu(): void {
    this.rightMenuOpen = !this.rightMenuOpen;
  }
  
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.creator.toLowerCase().includes(searchTerm) ||
      product.ISBN.toLowerCase().includes(searchTerm)
    );
  }                                    

  selectProduct(product: string): void {
    this.selectedProduct = product;
    this.menuOpen = false;

    if (product === 'libro') {
      this.filteredProducts = this.products.filter(p => p.type === 'libro');
    } else if (product === 'pelicula') {
      this.filteredProducts = this.products.filter(p => p.type === 'pelicula');
    } else {
      this.filteredProducts = this.products; // Mostrar todos los productos si no es libro ni pelicula
    } 
    if (product === 'todos') {
      this.filteredProducts = this.products; // Mostrar todos los productos si no es libro ni pelicula
    }

    console.log(`Producto seleccionado: ${product}`);
  }

  goToPasswordChange(): void {
    this.router.navigate(['/cliente/password-change']);
  }

  getImageUrl(title: string): string | null {
    const imageUrl = `/assets/${title}.jpg`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => imageUrl;
    img.onerror = () => null;
    return imageUrl;
  }

}