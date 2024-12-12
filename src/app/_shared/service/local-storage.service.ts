import { Injectable } from '@angular/core';
import { User } from '../../_auth/interfaces/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userLogged: User | null = null;
  private password: string | null = null;
  private role: number | null = null;
  private products: any[] = [];
  user: any;

  constructor() { }

  // Métodos para gestionar usuarios
  setClientLogger(user: User): void {
    this.userLogged = user;
    localStorage.setItem('User', JSON.stringify(user));
  }

  getClientLogger(): User | null {
    if (!this.userLogged) {
      this.userLogged = JSON.parse(localStorage.getItem('User') || '{}');
    }
    return this.userLogged;
  }

  setToken(token: string): void {
    localStorage.setItem('Token', token);
  }

  getPasswd(): string | null {
    if (!this.userLogged) {
      this.password = JSON.parse(localStorage.getItem('password') || '{}');
    }
    return this.password;
  }

  setPasswd(passwd: string): void {
    localStorage.setItem('password', JSON.stringify(passwd));
  }

  getToken(): string | null {
    return localStorage.getItem('Token');
  }

  // Métodos para gestionar productos
  setProducts(products: any[]): void {
    this.products = products;
    localStorage.setItem('Products', JSON.stringify(products));
  }

  getProducts(): any[] {
    if (this.products.length === 0) {
      this.products = JSON.parse(localStorage.getItem('Products') || '[]');
    }
    return this.products;
  }

  addProduct(product: any): void {
    this.products = this.getProducts(); // Asegurarse de obtener los productos actuales
    this.products.push(product);
    localStorage.setItem('Products', JSON.stringify(this.products));
  }
}