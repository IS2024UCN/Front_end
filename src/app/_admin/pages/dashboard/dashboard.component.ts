import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrección aquí
})
export class DashboardComponent {
  placeholders = Array(9).fill(null);

  constructor(private router: Router) {} // Inyecta el servicio Router

  goToWorkerRegister(): void {
    // Redirige a la ruta completa de worker-register bajo administrador
    this.router.navigate(['/administrador/worker-register']);
  }

  goToSeeWorkers(): void {
    // Redirige a la ruta completa de see-workers bajo administrador
    this.router.navigate(['/administrador/see-workers']);
  }
}
