import { Component } from '@angular/core'
import { LoginFormComponent } from './components/login-form/login-form.component'

@Component({
  selector: 'app-root',
  imports: [LoginFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
