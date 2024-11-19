import { Component } from '@angular/core';
import { LocalStorageService } from '../../../_shared/service/local-storage.service';
import { Router, RouterOutlet} from '@angular/router';
import { User } from '../../../_auth/interfaces/ResponseAPI';
import { NavbarComponent } from '../../../_shared/components/navbar/navbar.component';


@Component({
  selector: 'app-general-page',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './general-page.component.html',
  styleUrl: './general-page.component.css'
})
export class GeneralPageComponent {
  user!: User;

  constructor(private localStorageService:LocalStorageService, private router:Router) {}

  ngOnInit(): void {
    const user = this.localStorageService.getClientLogger();

    if(user){
      this.user = user;
    }else{
      this.router.navigate(['/login']);
    }
  }
}
