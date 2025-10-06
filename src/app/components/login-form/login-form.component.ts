import { ChangeDetectionStrategy, Component, computed, inject, signal, DestroyRef } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { LoginRequest } from '../../models/authentication/login-request'
import { password } from '../../utils/password.validator'

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private readonly router = inject(Router)
  private readonly authenticationService = inject(AuthenticationService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly destroyRef = inject(DestroyRef)
  private readonly fb = inject(NonNullableFormBuilder)

  protected readonly title = signal('Authentication')
  protected readonly email = signal('')
  protected readonly password = signal('')
  protected readonly errorMessage = signal('')
  protected readonly loginRequest = computed(() => new LoginRequest(this.email(), this.password()))

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, password()]]
  })

  login() {
    this.errorMessage.set('')
    this.authenticationService.login(this.loginRequest())
      .pipe(takeUntilDestroyed(this.destroyRef))
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ error: errorResponse => this.errorHandler(errorResponse) })
  }

  private errorHandler(errorResponse: HttpErrorResponse): void {
    this.errorMessage.set(errorResponse.error.error ?? `${errorResponse.error.status} - ${errorResponse.error.statusText}`)
  }
}
