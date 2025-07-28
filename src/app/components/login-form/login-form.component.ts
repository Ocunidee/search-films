import { Component, output, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  protected readonly title = signal('Authentication')
  protected readonly email = signal('')
  protected readonly password = signal('')
  protected readonly loggedIn = output<boolean>()

  protected login(): void {
    this.loggedIn.emit(true)
  }
}
