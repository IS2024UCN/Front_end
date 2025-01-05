import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-see-clients-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './see-clients-form.component.html',
  styleUrl: './see-clients-form.component.css',
  providers: [AuthServiceService]
})
export class SeeClientsFormComponent implements OnInit{
  clients: any[] = []; // Lista de clientes
  filteredClients: any[] = []; // Lista de clientes filtrada

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    // Obtener los clientes desde el backend
    this.authService.getClients().then((data: any) => {
      this.clients = data.data;
      this.filteredClients = this.clients;
    }).catch((error: any) => {
      console.error('Error al obtener clientes:', error);
    });
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.rut.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.phone.toLowerCase().includes(searchTerm) ||
      (client.active ? 'activo' : 'inactivo').includes(searchTerm) // Para filtrar por 'active'
    );
  }

  toggleEditActive(client: any): void {
    // Alternar la edición del estado "active"
    client.editingActive = !client.editingActive;
  }

  enableEditClient(client: any): void {
    client.editing = true;
    client.originalValues = { ...client }; // Guardar los valores originales del cliente
  }

  cancelEdit(client: any): void {
    client.editing = false;
    client.name = client.originalValues.name; // Restaurar valores originales
    client.email = client.originalValues.email;
    client.phone = client.originalValues.phone;
    client.active = client.originalValues.active;
  }

  confirmChanges(client: any): void {
    const {rut, name, email, phone, active } = client;
    const string_active = active
    console.log('Confirmar cambios: ', rut, name, phone, email, string_active);
    this.authService.updateClient(rut, name, phone, email, string_active).subscribe(
      (response) => {
        console.log('Cambios confirmados:', response);
        alert('Cambios confirmados exitosamente.');
        client.editing = false;
      },
      (err: HttpErrorResponse) => {
        console.error('Error al actualizar cliente:', err);
        if (err.status === 500) {
          alert('Error al actualizar cliente.');
        }else{
          alert(`Error: ${err.message}`);
        }
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/trabajador/dashboard']);
  }
}


