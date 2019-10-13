import { Controller, Post, Body } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpResponse } from "./http.response";

import { nytAPI } from "./util/nyt.api";

require("dotenv").config();

const apiURL = `articlesearch.json?api-key=${process.env.NYT_KEY}&q=`;

export class FetchArticleDTO {
  readonly query: string;
}

export class SaveArticleDTO {
  readonly article: ArticleDTO;
  readonly images: ImageArticle[];
  readonly authors: AuthorArticle[];
}

export class ArticleDTO {
  readonly webUrl: string;
  readonly snippet: string;
  readonly headline: string;
  readonly pubDate: string;
}

export class ImageArticle {
  readonly height: number;
  readonly width: number;
  readonly caption: string;
  readonly url: string;
}

export class AuthorArticle {
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly organization: string;
  readonly title: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("articles")
  fetchArticles(
    @Body() fetchArticleDTO: FetchArticleDTO,
  ): Promise<HttpResponse> {
    try {
      const { query } = fetchArticleDTO;
      return nytAPI
        .get(`${apiURL}${query}`)
        .then(({ data }) => new HttpResponse(true, "", data));
    } catch (e) {
      console.error(e);
    }
  }

  @Post("favorite")
  saveArticle(@Body() saveArticleDTO: SaveArticleDTO): Promise<HttpResponse> {
    try {
      const { article, images, authors } = saveArticleDTO;
      return nytAPI
        .get(`${apiURL}${query}`)
        .then(({ data }) => new HttpResponse(true, "", data));
    } catch (e) {
      console.error(e);
    }
  }
}
