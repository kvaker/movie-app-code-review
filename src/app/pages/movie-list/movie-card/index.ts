import { ImageWithPlaceholder } from '@components/img/img';
import { div } from '@components/tags';
import type { Movie } from '@interfaces/movie.interface';

import styles from './styles.module.scss';

interface Props {
  movie: Movie;
  onClick: () => void;
}
//Added a conditional check to ensure that onClick exists before invoking it.
//If onClick is defined, it will be called; otherwise, nothing happens.
//Removed the unusual .bind() calls from the onclick handler.
//Instead, directly call the onClick function if it exists.
export const MovieCard = ({ movie, onClick }: Props) => {
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return div(
      {
        className: styles.card,
        onclick: handleClick,
      },
      ImageWithPlaceholder({
        src: movie.posterUrlPreview,
        className: styles.poster,
      }),
      div({
        className: styles.title,
        txt: movie.nameRu,
      }),
//Simplified the year conversion to a string: movie.year.toString().
//Used genre.genre to extract the genre name (assuming genre is an object with a genre property).
      div({
        className: styles.year,
        txt: movie.year.toString(),
      }),
      div({
        className: styles.genres,
        txt: movie.genres
          .map((genre) => genre.genre)
          .filter(Boolean)
          .join(', '),
      })
    );
  };

export const PLEASE_DONT_EXPORT_THIS_SECRET_COMPONENT = () => {
  return div({});
};
