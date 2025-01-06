import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-rents',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './confirm-rents.component.html',
  styleUrl: './confirm-rents.component.css',
  providers: [AuthServiceService]
})
export class ConfirmRentsComponent {
  rents: any[] = [];
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadRents();
  }

  loadRents(): void {
    this.authService.getRents().then((data: any) => {
      this.rents = data.data;
    }).catch((error: any) => {
      console.error('Error al obtener rentas:', error);
    });
  }

  updateRentStatus(rentId: number, status: string): void {
    this.authService.updateRentStatus(rentId, status).subscribe({
      next: response => {
        console.log('Rent status updated:', response);
        this.loadRents(); // Recargar las rentas después de actualizar el estado
        if (status === '1') {
          alert('La renta ha sido aceptada');
        } else if (status === '2') {
          alert('La renta ha sido rechazada');
        }
      },
      error: error => {
        console.error('Error updating rent status:', error);
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusNumber = parseInt(status, 10);
    switch (statusNumber) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Aceptado';
      case 2:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  }

}
