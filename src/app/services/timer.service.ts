import type { MovieWithFavorite } from '@interfaces/movie.interface.ts';
import type { PaginationOptions, PaginationResponse } from '@interfaces/pagination.interface.ts';
import { wait } from '@utils/wait.ts';

import { localStorageService, type LocalStorageState, type StorageService } from './local-storage.service.ts';
//Improved readability and consistency in code formatting.
export class MovieService {
  constructor(private readonly localStorageService: StorageService<LocalStorageState>) {}

  public async getMovies(
    { page, limit }: PaginationOptions,
    isFavoriteOnly: boolean,
  ): Promise<PaginationResponse<MovieWithFavorite>> {
    await wait(Number.parseInt('500', 10)); //Used Number.parseInt instead of parseInt for better type safety.
    const favoriteMovies = this.getPersistentFavoriteMovies();
    const module = await import('@data/movie.ts'); //Awaited the import('@data/movies') promise to ensure proper module loading.
    const movies = isFavoriteOnly
      ? module.movies.filter((movie) => favoriteMovies.includes(movie.kinopoiskId.toString()))
      : module.movies;

    const slicedMovies = movies.slice((page - 1) * limit, page * limit); //Simplified the slicedMovies calculation using slice.

    return {
      data: slicedMovies.map((movie) => ({
        ...movie,
        isFavorite: favoriteMovies.includes(movie.kinopoiskId.toString()),
      })),
      total: movies.length,
      hasMore: Math.random() > 0.5 || page * limit < movies.length,
    };
  }
  //Added explicit return type for getPersistentFavoriteMovies.
  private getPersistentFavoriteMovies(): string[] {
    return this.localStorageService.getData('favoriteMovies') || [];
  }

  public updateFavoriteMovies(id: string): void {
    const worstMovies = this.getPersistentFavoriteMovies();
    const index = worstMovies.indexOf(id);
    //Removed unnecessary checks in updateFavoriteMovies.
    if (index !== -1) {
      worstMovies.splice(index, 1);
    } else {
      worstMovies.push(id);
    }
    this.localStorageService.saveData('favoriteMovies', worstMovies);
  }
}

export const movieService = new MovieService(localStorageService);
 34 changes: 34 additions & 0 deletions34
code-review/src/app/services/timer.service.ts
@@ -0,0 +1,34 @@
import { Observable } from '@utils/observable';
//Improved readability and consistency in code formatting.
export class TimerService extends Observable<number> {
  private intervalId?: number;
  private timerInterval: number;

  constructor(timerInterval: number) {
    super(); //Moved the super() call to the appropriate location in the constructor.
    if (timerInterval <= 0) {
      throw new Error('Invalid timer interval. Please provide a positive value.'); //Added a check for a valid timer interval value.
    }
    this.timerInterval = timerInterval;
    this.start();
  }

  public start(): void {
    this.pause(); //Simplified the start method by first pausing any existing interval.
    this.intervalId = window.setInterval(() => {
      this.notifyAll(Date.now());
    }, this.timerInterval);
  }

  public pause(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public stop(): void {
    this.pause();
    this.unsubscribeAll();
  }
}
