import { Component } from '@angular/core';
import { workerRegisterComponent } from '../../../components/worker-register/worker-register.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-register',
  standalone: true,
  imports: [workerRegisterComponent, HttpClientModule, CommonModule],
  templateUrl: './worker-register.component.html',
  styleUrl: './worker-register.component.css'
})
export class WorkerRegisterComponent {

}
