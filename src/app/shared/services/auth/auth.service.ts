import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../models/Auth/auth';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  authenticateAdminUser(authModel: Auth) {
    const path = environment.apiUrl + "admin/auth/login";
    return this.http.post(path, authModel);
  }
}
