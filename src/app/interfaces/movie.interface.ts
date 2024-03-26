export interface Movie {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string | null;
  year: number;
  countries: Country[];
  genres: Genre[];
  posterUrl: string;
  posterUrlPreview: string;
  duration: number;
  premiereRu: string;
}

export interface MovieWithFavorite extends Movie {
  isFavorite?: boolean;
}
//Renamed ICountry to Country and IGenres to Genre for consistency (using singular form).
export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}
//Removed unused interfaces (IMovie, IMovie2, and IMovie3).
