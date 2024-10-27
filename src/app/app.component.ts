import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-app';

  async ngOnInit(): Promise<void> {
    if (typeof window !== 'undefined'){
      const { initFlowbite } = await import('flowbite');
      initFlowbite();
    }
  }
}