import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

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

  protected login(): void {
    this.authenticationService.login()
    const postLoginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl')
    this.router.navigateByUrl(postLoginUrl ? `/${postLoginUrl}` : '')
  }
}
