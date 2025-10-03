import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FilmComponent } from '../film/film.component'
import { Film } from '../../models/film'
import { FilmService } from '../../services/film.service'

@Component({
  selector: 'app-film-search',
  imports: [FormsModule, FilmComponent],
  templateUrl: './film-search.component.html',
  styleUrl: './film-search.component.scss'
})
export class FilmSearchComponent {
  private readonly filmService = inject(FilmService)
  protected readonly films = signal<Film[]>([])

  searchFilms(title: string): void {
    this.filmService.search(title)
      .subscribe(films => this.films.set(films))
  }
}
