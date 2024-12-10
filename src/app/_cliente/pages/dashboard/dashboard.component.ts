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

  constructor(private router: Router) {} 

  goToPasswordChange(): void {
    // Redirige a la ruta completa de password-change 
    this.router.navigate(['/cliente/password-change']);
  }
}