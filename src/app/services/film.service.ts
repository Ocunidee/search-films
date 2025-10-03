import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Film } from '../models/film'

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private readonly httpClient = inject(HttpClient)
  private readonly baseUrl = 'api/movies/search'

  search(title: string): Observable<Film[]> {
    const options = {
      params: new HttpParams().set('title', title)
    }

    return this.httpClient.get<Film[]>(this.baseUrl, options)
  }
}
