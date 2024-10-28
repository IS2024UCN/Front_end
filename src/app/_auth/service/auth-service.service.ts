import { Injectable } from '@angular/core';
import { User } from '../interfaces/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8000/api/'

  public errors: string[] = [];
  private userLogged: User | null = null;


  constructor() { }

  login(algo:any){}
}
