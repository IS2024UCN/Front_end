import { Component } from '@angular/core';
import { LoginformtrabajadorComponent } from '../../../components/loginformtrabajador/loginformtrabajador.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-trabajador',
  standalone: true,
  imports: [LoginformtrabajadorComponent, HttpClientModule, CommonModule],
  templateUrl: './login-trabajador.component.html',
  styleUrl: './login-trabajador.component.css'
})
export class LoginTrabajadorComponent {

}
