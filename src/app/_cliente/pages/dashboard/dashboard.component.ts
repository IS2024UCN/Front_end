import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  placeholders = Array(9).fill(null);

  menuOpen = false;
  selectedProduct: string | null = null;

  constructor(private router: Router) {} 

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  selectProduct(product: string): void {
    this.selectedProduct = product;
    this.menuOpen = false;
    // Lógica adicional para manejar la selección del producto
    console.log(`Producto seleccionado: ${product}`);
  }

}