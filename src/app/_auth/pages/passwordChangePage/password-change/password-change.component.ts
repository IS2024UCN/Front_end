import { Component } from '@angular/core';
import { PasswordChangeFormComponent } from '../../../components/password-change-form/password-change-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [PasswordChangeFormComponent, HttpClientModule, CommonModule],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class passwordChangeComponent {

}
