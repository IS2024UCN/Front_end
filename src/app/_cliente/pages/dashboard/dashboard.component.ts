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

  constructor(private productService: AuthServiceService, private router: Router) {} 

  menuOpen = false;
  rightMenuOpen = false;

  ngOnInit(): void {
    this.productService.getProducts().then((data: any) => {
      this.products = data.data.map((product: { title: string; }) => ({
        ...product,
        imageUrl: this.getImageUrl(product.title)
      }));
      this.filteredProducts = this.products;
    }).catch((error: any) => {
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
    if (product === 'todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.type === product);
    }
  }

  getImageUrl(title: string): string {
    return `/assets/${title}.jpg`;
  }

  goToPasswordChange(): void {
    this.router.navigate(['/cliente/password-change']);
  }

}