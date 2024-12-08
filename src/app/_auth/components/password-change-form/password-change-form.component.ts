import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-password-change-form',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './password-change-form.component.html',
  styleUrl: './password-change-form.component.css'
})
export class PasswordChangeFormComponent implements OnInit {
  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private Router: Router) {
    

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.Router.navigate(['/cliente']);
  }

}