import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { AuthServiceService } from '../../../_auth/service/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../_auth/interfaces/ResponseAPI';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [AuthServiceService]
})
export class NavbarComponent {

  @Input() client!: User;

  constructor(private router:Router, private AuthServiceService:AuthServiceService) {}

  logout(){
    this.AuthServiceService.logout();
    this.router.navigate(['/login']);
  }
}
