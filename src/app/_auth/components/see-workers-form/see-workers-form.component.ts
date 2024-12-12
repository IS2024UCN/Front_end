import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ProductsService } from '../../service/products.Service';

@Component({
  selector: 'auth-see-workers-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './see-workers-form.component.html',
  styleUrl: './see-workers-form.component.css',
  providers: [ProductsService]
})
  export class SeeWorkersFormComponent implements OnInit {


    productsService = inject(ProductsService);
    products: any = [];

    constructor(){}

    ngOnInit(): void {
      this.productsService.getProducts().then((data: any) => {
        this.products = data.data;
      }
      //Validar que la lista este vacia o haya algun error
      ).catch((error: any) => {
        console.error('Error: ', error);
      }

    );
    }

}