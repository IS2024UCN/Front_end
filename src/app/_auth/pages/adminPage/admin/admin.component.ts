import { Component } from '@angular/core';
import { AdminComponent } from '../../../components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminComponent, HttpClientModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminFComponent {

}
