import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  host = 'http://localhost:8000/api/'

  private _isAuthenticated = signal(false)
  readonly isAuthenticated = this._isAuthenticated.asReadonly()

  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: any) {
    const url = this.host + 'login'
    return this.http.post(url, user)
  }
  loginSuccess() {
    this._isAuthenticated.set(true)
  }

  logout() {
    localStorage.removeItem('token')
    this._isAuthenticated.set(false)
    this.router.navigate(['login'])
  }
}
