import { Component, input } from '@angular/core'
import { Film } from '../../models/film'
import { StarRatingPipe } from '../../pipes/star-rating.pipe'

@Component({
  selector: 'app-film',
  imports: [StarRatingPipe],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent {
  readonly film = input.required<Film>()
}
