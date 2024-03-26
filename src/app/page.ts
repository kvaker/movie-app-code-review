import { main } from "@components/tags";
import { movieService } from "@services/movie.service";

import { BaseComponent } from "./components/base-component";
import { Header } from "./components/header/header";
import { MovieListPage } from "./pages/movie-list";
//By passing Header and main as constructor parameters, we explicitly declare the dependencies and improve the readability and maintainability of our code
class PageWrapperComponent extends BaseComponent {
  constructor(headerComponent, mainComponent) {
    super(
      {
        className: "page-wrapper",
      },
      headerComponent(),
      mainComponent({ className: "main" }, MovieListPage(movieService)),
    );
  }
}

export const PageWrapper = () => new PageWrapperComponent(Header, main);
