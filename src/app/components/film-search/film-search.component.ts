import { Component, inject } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FilmComponent } from '../film/film.component'
import { Film } from '../../models/film'
import { FilmService } from '../../services/film.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-film-search',
  imports: [FormsModule, FilmComponent, AsyncPipe],
  templateUrl: './film-search.component.html',
  styleUrl: './film-search.component.scss'
})
export class FilmSearchComponent {
  private readonly filmService = inject(FilmService)
  protected films: Observable<Film[]> | undefined

  searchFilms(title: string): void {
    this.films = this.filmService.search(title)
  }
}
