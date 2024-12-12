import { Inject, Injectable } from '@angular/core';
import { ResponseAPIChangePassword, ResponseAPILogin, ResponseAPIWorkerRegister, User } from '../interfaces/ResponseAPI';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIRegister } from '../interfaces/ResponseAPI';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../_shared/service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  public errors: string[] = [];
  private userLogged: User | null = null;

  constructor(private http: HttpClient) {}

  async login(form: any): Promise<ResponseAPILogin> {
    try {
      const data = await firstValueFrom(this.http.post<ResponseAPILogin>(`${this.baseUrl}/login`, form, this.crearHeaders()));
      console.log('Data: ', data);
      return data; 
    } catch (error) {
      console.error('Error en el servicio del login [Auth Service]: ', error);
      // Verifica si el error es un HttpErrorResponse
      if (error instanceof HttpErrorResponse) {
        this.errors.push(error.message || 'Error desconocido');
        if (error.error && error.error.message) {
          this.errors.push(error.error.message);
        }
      } else {
        this.errors.push('Error desconocido');
      }
      return Promise.reject(this.errors); 
    }
  }

  async register(form: any):Promise<ResponseAPIRegister> {
    try{
      const data = await firstValueFrom(this.http.post<ResponseAPIRegister>(`${this.baseUrl}/register`, form, this.crearHeaders()));
      console.log('Data: ', data);
      return Promise.resolve(data);
    } catch (error){
      console.log('Error en el servicio del registro [Auth Service]: ', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors)
    }
  } 

  async workerRegister(form: any): Promise<ResponseAPIWorkerRegister> {
    try {
      // Asegúrate de que la URL sea la correcta
      const data = await firstValueFrom(this.http.post<ResponseAPIRegister>(`${this.baseUrl}/registerWorker`, form, this.crearHeaders()));
      console.log('Data: ', data);
      return Promise.resolve(data);
    } catch (error) {
      console.log('Error en el servicio del registro [Auth Service]: ', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }
  



  async changePassword(form: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post( `${this.baseUrl}/update-Password`, form, this.crearHeaders()));
      
      console.log('Data: ', response);
      return response;  // Devuelve la respuesta de la API
      
    } catch (error) {
      console.error('Error en el servicio del cambio de contraseña [Auth Service]: ', error);
      
      if (error instanceof HttpErrorResponse) {
        this.errors.push(error.message || 'Error desconocido');
        if (error.error && error.error.message) {
          this.errors.push(error.error.message);  // Agrega detalles de error si están disponibles
        }
      } else {
        this.errors.push('Error desconocido');  // Si el error no es un HttpErrorResponse
      }
      
      return Promise.reject(this.errors);  // Devuelve el array de errores en caso de que haya fallado
    }
  }
  
  

  async updatePassword(currentPassword: string, newPassword: string): Promise<ResponseAPIChangePassword> {
    const formData = { current_password: currentPassword, new_password: newPassword };
    try {
      const response = await firstValueFrom(
        this.http.post<ResponseAPIChangePassword>(`${this.baseUrl}/password-change`, formData, {
          headers: this.crearAuthHeaders().headers,
        })
      );
      console.log('Contraseña cambiada correctamente: ', response);
      return response;
    } catch (error) {
      console.error('Error en el servicio de cambio de contraseña [Auth Service]: ', error);
  
      if (error instanceof HttpErrorResponse) {
        this.errors.push(error.message || 'Error desconocido');
        if (error.error && error.error.message) {
          this.errors.push(error.error.message);
        }
      } else {
        this.errors.push('Error desconocido');
      }
      return Promise.reject(this.errors);
    }
  }
  
  
  
  crearAuthHeaders() {
    const token = localStorage.getItem('Token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  
  

   logout(): void{
    this.userLogged = null;
    localStorage.removeItem('User');
   }

  crearHeaders(){
    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
}
