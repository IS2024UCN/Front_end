import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../../components/registerform/registerform.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
