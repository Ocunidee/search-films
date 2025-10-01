import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private readonly router = inject(Router)
  protected readonly title = signal('Authentication')
  protected readonly email = signal('')
  protected readonly password = signal('')

  protected login(): void {
    this.router.navigateByUrl('/search')
  }
}
