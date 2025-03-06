import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyReponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage =
    localStorage.getItem(environment.gif_key) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
};

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoaing = signal(false);
  private trendingPage = signal(0);

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, (i += 3)));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(
      environment.gif_key,
      JSON.stringify(this.searchHistory())
    );
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoaing()) return;

    this.trendingGifsLoaing.set(true);

    this.http
      .get<GiphyReponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.apiKey,
          limit: 40,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe(({ data }) => {
        const gifs = GifMapper.mapGiphyItemtoGifArray(data);
        this.trendingGifs.update((gifsCurrent) => [...gifsCurrent, ...gifs]);
        this.trendingPage.update((value) => (value += 1));
        this.trendingGifsLoaing.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyReponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          q: query,
          api_key: environment.apiKey,
          limit: 40,
        },
      })
      .pipe(
        map(({ data }) => GifMapper.mapGiphyItemtoGifArray(data)),
        tap((item) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase().trim()]: item,
          }));
        })
      );
    // TODO Historial
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
