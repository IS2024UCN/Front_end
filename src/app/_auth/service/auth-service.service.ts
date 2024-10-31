import { Inject, Injectable } from '@angular/core';
import { ResponseAPILogin, User } from '../interfaces/ResponseAPI';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8000/api';
  public errors: string[] = [];
  private userLogged: User | null = null;

  constructor(private http: HttpClient) {}

  async login(form: any): Promise<ResponseAPILogin> {
    try {
      const data = await firstValueFrom(this.http.post<ResponseAPILogin>(`${this.baseUrl}/login`, form, this.crearHeaders()));
      return Promise.resolve(data);
    } catch (error) {
      console.log('Error en el servicio del login [Auth Service]: ', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

  setClientLogger(user: User ): void{
    this.userLogged = user;
    localStorage.setItem('User', JSON.stringify(user));
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
