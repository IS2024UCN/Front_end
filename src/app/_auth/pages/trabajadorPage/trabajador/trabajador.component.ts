import { Component } from '@angular/core';
import { TrabajadorComponent } from '../../../components/trabajador/trabajador.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trabajador',
  standalone: true,
  imports: [TrabajadorComponent, HttpClientModule, CommonModule],
  templateUrl: './trabajador.component.html',
  styleUrl: './trabajador.component.css'
})
export class TrabajadorFComponent {

}
