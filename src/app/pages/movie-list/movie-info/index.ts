import { BaseComponent } from '@components/base-component';
import { ImageWithPlaceholder } from '@components/img/img';
import { div, h3, iconFromCode, span } from '@components/tags';
import { Timer } from '@components/timer/timer';
import type { MovieWithFavorite } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

type MovieInfoPropsFields = {
    movie: MovieWithFavorite;
  };

  type MovieInfoPropsFns = {
    onMakeFavorite: () => void;
  };

  interface Drops extends MovieInfoPropsFields, MovieInfoPropsFns {}

  class MovieInfoComponent extends BaseComponent {
    private readonly favoriteIcon: BaseComponent;

    constructor({ movie, onMakeFavorite }: MovieInfoProps) {
      super({ className: styles.info });

      this.renderPoster(movie);
      this.renderDescription(movie);
      this.renderDetails(movie);
      this.renderFavoriteIcon(movie, onMakeFavorite);
    }

    private renderPoster(movie: MovieWithFavorite) {
      this.append(
        ImageWithPlaceholder({
          src: movie.posterUrlPreview,
          className: styles.poster,
        })
      );
    }

    private renderDescription(movie: MovieWithFavorite) {
      this.append(
        div({
          className: styles.description,
          txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales, ligula ornare sodales mattis, tellus lectus porttitor diam, vitae porta mi arcu ac nunc. Nam quam erat, aliquet at sodales id, consectetur a ligula. Mauris ut nunc sodales, efficitur neque eget, euismod massa.',
        })
      );
    }

    private renderDetails(movie: MovieWithFavorite) {
      this.append(
        div({ className: styles.row }, div({ txt: 'Year' }), div({ className: styles.year, txt: movie.year.toString() })),
        // Other details (genres, duration, countries, premiere) go here...
      );
    }

    private renderFavoriteIcon(movie: MovieWithFavorite, onMakeFavorite: () => void) {
      this.favoriteIcon = iconFromCode(
        {
          className: `${styles.favoriteButton} ${movie.isFavorite ? styles.favorite : ''}`,
        },
        '★' // Use a named constant or variable for the star icon
      );

      this.append(this.favoriteIcon);
      this.favoriteIcon.onclick = onMakeFavorite;
    }
  }

  export const MovieInfo = (drills: Drops) => new MovieInfoComponent(drills);
