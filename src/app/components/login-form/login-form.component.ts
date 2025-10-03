import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { LoginRequest } from '../../models/authentication/login-request'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private readonly router = inject(Router)
  private readonly authenticationService = inject(AuthenticationService)
  private readonly activatedRoute = inject(ActivatedRoute)

  protected readonly title = signal('Authentication')
  protected readonly email = signal('')
  protected readonly password = signal('')
  protected readonly errorMessage = signal('')
  protected readonly loginRequest = computed(() => new LoginRequest(this.email(), this.password()))

  login() {
    this.errorMessage.set('')
    this.authenticationService.login(this.loginRequest())
      .subscribe({
        next: () => {
          const postLoginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl')
          this.router.navigateByUrl(postLoginUrl ? `/${postLoginUrl}` : '')
        },
        error: errorResponse => this.errorHandler(errorResponse)
      })
  }

  register(): void {
    this.errorMessage.set('')
    this.authenticationService.register(this.loginRequest())
      .subscribe({ error: errorResponse => this.errorHandler(errorResponse) })
  }

  private errorHandler(errorResponse: HttpErrorResponse): void {
    this.errorMessage.set(errorResponse.error.error ?? `${errorResponse.error.status} - ${errorResponse.error.statusText}`)
  }
}
