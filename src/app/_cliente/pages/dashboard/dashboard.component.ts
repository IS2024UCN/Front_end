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
  cart: any[] = [];
  rentalDays: number = 1;
  finalPrice: number = 0;
  showFinalPrice: boolean = false;
  filteredProducts: any[] = []; // Lista filtrada que se muestra en la tabla
  cartOpen = false;
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

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
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

  addToCart(product: any): void {
    this.cart.push(product);
  }
  removeFromCart(product: any): void {
    this.cart = this.cart.filter(item => item !== product);
  }
  updateRentalDays(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.rentalDays = parseInt(input.value, 10);
  }
  calculateFinalPrice(): void {
    if (this.cart.length > 0) {
      this.finalPrice = this.cart[0].rental_price * this.rentalDays;
      this.showFinalPrice = true;
    }
  }
  confirmFinalRental(): void {
    if (this.cart.length > 0) {
      const rentalInfo = {
        product: this.cart[0],
        days: this.rentalDays,
        price: this.finalPrice
      };
      console.log('Rental confirmed:', rentalInfo);
      alert(`Producto arrendado por ${this.rentalDays} días. Precio final: $${this.finalPrice}`);
      this.cart = [];
      this.rentalDays = 1;
      this.finalPrice = 0;
      this.showFinalPrice = false;
      this.cartOpen = false;
    }
  }
  cancelFinalRental(): void {
    this.showFinalPrice = false;
  }

  getImageUrl(title: string): string {
    return `/assets/${title}.jpg`;
  }

  goToPasswordChange(): void {
    this.router.navigate(['/cliente/password-change']);
  }

}