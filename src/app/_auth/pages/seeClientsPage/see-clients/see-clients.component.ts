import { Component } from '@angular/core';
import { SeeClientsFormComponent } from '../../../components/see-clients-form/see-clients-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-clients',
  standalone: true,
  imports: [SeeClientsFormComponent, CommonModule, HttpClientModule],
  templateUrl: './see-clients.component.html',
  styleUrl: './see-clients.component.css'
})
export class SeeClientsComponent {

}
