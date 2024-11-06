import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BibliotechFrontend';

  constructor(private Router: Router) {}

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined') {
      const { initFlowbite } = await import('flowbite');
      initFlowbite();
    }
  }

  navigateToLogin(): void {
    this.Router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.Router.navigate(['/register']);
  }
}
