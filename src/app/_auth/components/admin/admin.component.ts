import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [AuthServiceService]
})
export class AdminComponent {
    
}
