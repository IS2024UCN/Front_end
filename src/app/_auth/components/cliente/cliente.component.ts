import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [AuthServiceService]

})
export class ClienteComponent {

}
