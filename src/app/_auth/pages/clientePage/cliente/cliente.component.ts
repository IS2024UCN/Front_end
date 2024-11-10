import { Component } from '@angular/core';
import { ClienteComponent } from '../../../components/cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ClienteComponent, HttpClientModule, CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteFComponent {

}
