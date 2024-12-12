import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../service/products.Service';
import { inject } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  productsService = inject(ProductsService);
    products: any = [];

    constructor(){}

    ngOnInit(): void {
      this.productsService.getProducts().then((data: any) => {
        this.products = data.data;
      }
      //Validar que la lista este vacia o haya algun error
    );
    }

}
