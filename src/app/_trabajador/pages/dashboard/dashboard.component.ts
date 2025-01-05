import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: []
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToRegisterTrabajador() {
    this.router.navigate(['/loginTrabajador']);
  }
  
  goToProductRegister() {
    this.router.navigate(['/trabajador/productRegister']);
  }

  goToSeeProducts() {
    this.router.navigate(['/trabajador/seeProducts']);
  }

  goToSeeClients() {
    this.router.navigate(['/trabajador/seeClients']);
  }
}
