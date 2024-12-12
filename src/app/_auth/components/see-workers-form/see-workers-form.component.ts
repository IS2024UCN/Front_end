import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';


@Component({
  selector: 'auth-see-workers-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './see-workers-form.component.html',
  styleUrl: './see-workers-form.component.css',
  providers: [AuthServiceService]
})
  export class SeeWorkersFormComponent implements OnInit {

    authService = inject(AuthServiceService);
    workers: any = [];
  
    constructor() {}
  
    ngOnInit(): void {
      this.authService.getWorkers().then((data: any) => {
          console.log('Data: ', data);
          this.workers = data.data;
        })
        .catch((error: any) => {
          console.error('Error fetching workers:', error);
        });
    }
  }
  