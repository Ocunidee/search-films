import { computed, inject, Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { LoginRequest } from '../models/authentication/login-request'
import { RegistrationRequest } from '../models/authentication/registration-request'
import { UserResponse } from '../models/authentication/user-response'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient)
  private readonly baseUrl = 'api/user'

  token = signal<string | null>(null)
  loggedIn = computed(() => this.token() != null)

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(tap(response => this.token.set(response.token)))
  }

  register(loginRequest: LoginRequest): Observable<UserResponse> {
    const registrationRequest = new RegistrationRequest(
      loginRequest.email,
      loginRequest.password,
      'John',
      'Smith'
    )

    return this.httpClient.post<UserResponse>(`${this.baseUrl}/register`, registrationRequest)
  }

  logout(): void {
    this.token.set(null)
  }
}
