import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductRegisterFormComponent } from '../../../components/product-register-form/product-register-form.component';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [ProductRegisterFormComponent,HttpClientModule, CommonModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent {

}
