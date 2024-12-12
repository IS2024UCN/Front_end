import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css', // Sin providers aquí
  providers: [AuthServiceService]
})
export class ProductsComponent implements OnInit {
  authService = inject(AuthServiceService);
  products: any = [];

  constructor() {}

  ngOnInit(): void {
    this.authService
      .getProducts()
      .then((data: any) => {
        console.log('Data: ', data);
        this.products = data.data;
      })
      .catch((error: any) => {
        console.error('Error fetching products:', error);
      });
  }
}
