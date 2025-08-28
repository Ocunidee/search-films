import { Component, signal } from '@angular/core'
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FilmSearchComponent } from './components/film-search/film-search.component'

@Component({
  selector: 'app-root',
  imports: [LoginFormComponent, FilmSearchComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly loggedIn = signal(false)

  protected login(): void {
    this.loggedIn.set(true)
  }

}
