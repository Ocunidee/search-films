import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  protected readonly title = signal('Authentication')
}
