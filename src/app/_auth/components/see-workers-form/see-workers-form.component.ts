import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'auth-see-workers-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './see-workers-form.component.html',
  styleUrls: ['./see-workers-form.component.css'],
  providers: [AuthServiceService]
})
export class SeeWorkersFormComponent implements OnInit {
  workers: any[] = []; // Lista de trabajadores
  filteredWorkers: any[] = []; // Lista filtrada que se muestra

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    // Obtener los trabajadores desde el backend
    this.authService.getWorkers().then((data: any) => {
      this.workers = data.data;
      this.filteredWorkers = this.workers;
    }).catch((error: any) => {
      console.error('Error al obtener trabajadores:', error);
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredWorkers = this.workers.filter(worker =>
      worker.name.toLowerCase().includes(searchTerm) ||
      worker.rut.toLowerCase().includes(searchTerm) ||
      worker.email.toLowerCase().includes(searchTerm) ||
      worker.phone.toLowerCase().includes(searchTerm) ||
      (worker.active ? 'activo' : 'inactivo').includes(searchTerm) // Para filtrar por 'active'
    );
  }

  toggleEditActive(worker: any): void {
    // Alternar la edición del estado "active"
    worker.editingActive = !worker.editingActive;
  }

  enableEditWorker(worker: any): void {
    worker.editing = true;
    worker.originalValues = { ...worker }; // Guardar los valores originales del trabajador
  }

  cancelEdit(worker: any): void {
    worker.editing = false;
    worker.name = worker.originalValues.name; // Restaurar valores originales
    worker.email = worker.originalValues.email;
    worker.phone = worker.originalValues.phone;
    worker.active = worker.originalValues.active;
  }

  confirmChanges(worker: any): void {
    this.authService.updateWorker(worker.rut, worker.name, worker.phone, worker.email).subscribe({
        next: (response) => {
            console.log('Cambios confirmados:', response);
            alert('Cambios confirmados exitosamente.');
        },
        error: (err: HttpErrorResponse) => {
            console.error('Error capturado:', err);
            if (err.status === 200 && err.error instanceof SyntaxError) {
                alert('El servidor devolvió una respuesta no válida.');
            } else {
                alert(`Error: ${err.message}`);
            }
        }
    });
}

  

  goBack(): void {
    this.router.navigate(['/administrador/dashboard']);
  }
}
