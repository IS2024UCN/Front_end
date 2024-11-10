import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'auth-trabajador',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './trabajador.component.html',
  styleUrl: './trabajador.component.css',
  providers: [AuthServiceService]
})
export class TrabajadorComponent {

  constructor(private router: Router, private authService: AuthServiceService) {
    
  }
  


  goToRegisterTrabajador() {
    this.router.navigate(['/loginTrabajador']);

  }
}
