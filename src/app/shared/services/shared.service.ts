import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private trendingScrollState = signal<number>(0);

  get ScrollState(): number {
    return this.trendingScrollState();
  }

  setUpdateScrollState(scrollCurrent: number) {
    this.trendingScrollState.set(scrollCurrent);
  }
}
