import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedIn = signal(false)

  login(): void {
    this.loggedIn.set(true)
  }

  logout(): void {
    this.loggedIn.set(false)
  }
}
