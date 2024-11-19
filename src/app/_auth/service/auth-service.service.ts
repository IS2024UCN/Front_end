import { Inject, Injectable } from '@angular/core';
import { ResponseAPILogin, User } from '../interfaces/ResponseAPI';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIRegister } from '../interfaces/ResponseAPI';
import { Router } from '@angular/router';
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
      return data; // No es necesario envolverlo en Promise.resolve, ya que 'data' ya es una promesa resuelta.
    } catch (error) {
      console.error('Error en el servicio del login [Auth Service]: ', error);
      // Verifica si el error es un HttpErrorResponse
      if (error instanceof HttpErrorResponse) {
        this.errors.push(error.message || 'Error desconocido');
        // Si el cuerpo del error contiene detalles adicionales, puedes agregarlos
        if (error.error && error.error.message) {
          this.errors.push(error.error.message);
        }
      } else {
        this.errors.push('Error desconocido');
      }
      return Promise.reject(this.errors); // Devuelve el arreglo de errores
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
