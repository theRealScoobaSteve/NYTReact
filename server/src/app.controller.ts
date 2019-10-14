import { Controller, Post, Body, Delete, Param, Get } from "@nestjs/common";
import { ApiModelProperty } from "@nestjs/swagger";
import { EntityManager } from "typeorm";

import { nytAPI } from "./util/nyt.api";
import { HttpResponse } from "./http.response";
import { Image } from "./database/entities/image.entity";
import { Author } from "./database/entities/author.entity";
import { Article } from "./database/entities/article.entity";

require("dotenv").config();

const apiURL = `articlesearch.json?api-key=${process.env.NYT_KEY}&q=`;

export class FetchArticleDTO {
  @ApiModelProperty()
  readonly query: string;
}

export class ArticleDTO {
  @ApiModelProperty()
  readonly webUrl: string;
  @ApiModelProperty()
  readonly snippet: string;
  @ApiModelProperty()
  readonly headline: string;
  @ApiModelProperty()
  readonly pubDate: string;
  @ApiModelProperty()
  readonly images: ImageDTO[];
  @ApiModelProperty()
  readonly authors: AuthorDTO[];
}

export class ImageDTO {
  @ApiModelProperty()
  readonly height: number;
  @ApiModelProperty()
  readonly width: number;
  @ApiModelProperty()
  readonly caption: string;
  @ApiModelProperty()
  readonly url: string;
}

export class AuthorDTO {
  @ApiModelProperty()
  readonly firstName: string;
  @ApiModelProperty()
  readonly lastName: string;
  @ApiModelProperty()
  readonly role: string;
  @ApiModelProperty()
  readonly organization: string;
  @ApiModelProperty()
  readonly title: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller("api")
export class AppController {
  constructor(private readonly entityManager: EntityManager) {}

  @Post("articles")
  async fetchArticles(
    @Body() fetchArticleDTO: FetchArticleDTO,
  ): Promise<HttpResponse> {
    const { query } = fetchArticleDTO;
    let articles = [];

    // https://stackoverflow.com/questions/50355670/nestjs-returning-the-result-of-an-http-request?rq=1
    await nytAPI
      .get(`${apiURL}${query}`)
      .then(({ data }) => {
        articles = data;
        return;
      })
      .catch(e => {
        console.log(e);
      });
    return new HttpResponse(true, "", articles);
  }

  @Post("favorites")
  async saveArticle(@Body() articleDTO: ArticleDTO): Promise<HttpResponse> {
    try {
      const {
        webUrl,
        snippet,
        headline,
        pubDate,
        images,
        authors,
      } = articleDTO;
      let imagesToSave = [];
      let authorsToSave = [];

      images.forEach(image => {
        imagesToSave.push(this.entityManager.create(Image, image));
      });

      authors.forEach(author => {
        authorsToSave.push(this.entityManager.create(Author, authors));
      });

      const articleToSave = this.entityManager.create(Article, {
        webUrl,
        snippet,
        headline,
        pubDate,
      });

      articleToSave.authors = authorsToSave;
      articleToSave.images = imagesToSave;
      articleToSave.favorite = true;

      await this.entityManager.save(articleToSave);

      return new HttpResponse(true, "Article Successfully Saved");
    } catch (e) {
      return new HttpResponse(false, e);
    }
  }

  @Delete("favorites/:id")
  async removeArticle(@Param() params): Promise<HttpResponse> {
    const { id } = params;

    try {
      await this.entityManager.update(Article, id, { favorite: false });

      return new HttpResponse(true, "Article Successfully Removed");
    } catch (e) {
      return new HttpResponse(false, e);
    }
  }

  @Get("favorites")
  async fetchFavorites(): Promise<HttpResponse> {
    const articles = await this.entityManager.find(Article, {
      favorite: true,
    });

    return new HttpResponse(true, "Saved Articles", articles);
  }
}
