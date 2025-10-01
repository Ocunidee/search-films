import { Component, inject, signal } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { AuthenticationService } from './services/authentication.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authenticationService = inject(AuthenticationService)
  private readonly router = inject(Router)

  protected readonly loggedIn = this.authenticationService.loggedIn

  protected logout(): void {
    this.authenticationService.logout()
    this.router.navigateByUrl('/login')
  }
}
