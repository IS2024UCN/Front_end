import { Component } from '@angular/core';
import { SeeWorkersFormComponent } from '../../../components/see-workers-form/see-workers-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-workers',
  standalone: true,
  imports: [SeeWorkersFormComponent, CommonModule, HttpClientModule],
  templateUrl: './see-workers.component.html',
  styleUrl: './see-workers.component.css'
})
export class SeeWorkersComponent {

}
