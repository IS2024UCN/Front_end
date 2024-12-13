import { Inject, Injectable } from '@angular/core';
import { ResponseAPIChangePassword, ResponseAPILogin, ResponseAPIWorkerRegister, User } from '../interfaces/ResponseAPI';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { ResponseAPIRegister } from '../interfaces/ResponseAPI';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../_shared/service/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  public errors: string[] = [];
  private userLogged: User | null = null;
  private localStorageService: LocalStorageService = new LocalStorageService();
  authService: any;

  constructor(private http: HttpClient,) {}

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




  // Método para actualizar el estado de un trabajador
  toggleWorkerStatus(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/toggleWorkerStatus`, { id });
  }

  // Método para actualizar la información de un trabajador
  // En tu método updateWorker
  updateWorker(rut: string, new_name: string, new_phone: string, new_email: string, string_active: string): Observable<any> {
    const headers = this.crearAuthHeaders();
    const body = { rut, new_name, new_phone, new_email, string_active };
    return this.http.put(`${this.baseUrl}/updateWorker`, body, headers);
  }




  async productRegister(form: any): Promise<any> {
    try {
      const options = this.crearAuthHeaders();
      const data = await firstValueFrom(this.http.post<any>(`http://127.0.0.1:8000/api/registerProduct`, form, options));
      console.log('Producto registrado: ', data);
  
      // Guardar el producto en el LocalStorage
      this.localStorageService.addProduct(data);
  
      // Aquí agregamos el campo 'error' para facilitar la lógica del componente
      return { error: false, message: data.message, data: data.data };
    } catch (error) {
      console.log('Error en el servicio del registro de producto [Auth Service]: ', error);
      const e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return { error: true, message: this.errors.join(', ') };
    }
  }

  updateProductPrice(isbn: string, newPrice: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/updateProductPrice`; // Asegúrate de que coincida con la ruta del backend
    const body = { ISBN: isbn, new_price: newPrice }; // Pasando el ISBN y el nuevo precio
    return this.http.put(url, body, this.crearAuthHeaders())  // Utiliza 'crearAuthHeaders' para enviar el token de autenticación
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el precio del producto:', error);
          throw error;  // Lanza el error para que lo manejes adecuadamente
        })
      );
  }

  replenishStock(isbn: string, quantity: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/replenishStock`; // Asegúrate de que coincida con la ruta del backend
    const body = { ISBN: isbn, quantity: quantity }; // Pasando el ISBN y el nuevo stock
    return this.http.put(url, body, this.crearAuthHeaders())  // Utiliza 'crearAuthHeaders' para enviar el token de autenticación
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar el stock del producto:', error);
          throw error;  // Lanza el error para que lo manejes adecuadamente
        })
      );
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
  



  async changePassword(form: any): Promise<ResponseAPIChangePassword> {
    try {
      console.log('Formulario de cambio de contraseña: ', form);
      // Asegúrate de que this.baseUrl esté configurado correctamente, por ejemplo:
      // this.baseUrl = 'http://127.0.0.1:8000/api' o usa una variable de entorno si es necesario.
      
      const data = await firstValueFrom(this.http.post<ResponseAPIChangePassword>(
        `http://127.0.0.1:8000/api/update-Password`,  // Asegúrate de que esta URL sea la correcta
        form,
        this.crearAuthHeaders()
      ));
      
      console.log('Data: ', data);
      return data;  // Devuelve la respuesta de la API
      
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

  async getProducts(): Promise<any> {
    try {
      const data = await firstValueFrom(this.http.get<any>(`${this.baseUrl}/getProducts`, this.crearAuthHeaders()));
      return data; // Eliminado Promise.resolve innecesario
    } catch (error) {
      console.error('Error: ', error);
      const e = error as HttpErrorResponse;
      throw e.message || 'Server error'; // Usando throw en lugar de Promise.reject
    }
  }

  async getWorkers(): Promise<any> {
    try {
      const data = await firstValueFrom(this.http.get<any>(`${this.baseUrl}/getWorkers`, this.crearAuthHeaders()));
      return data; // Eliminado Promise.resolve innecesario
    } catch (error) {
      console.error('Error: ', error);
      const e = error as HttpErrorResponse;
      throw e.message || 'Server error'; // Usando throw en lugar de Promise.reject
    }
  }
  
  
  
  crearAuthHeaders() {
    const token = localStorage.getItem('Token');
    console.log('Token: ', token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`,
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
