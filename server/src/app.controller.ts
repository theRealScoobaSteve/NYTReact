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

export class SaveArticleDTO {
  @ApiModelProperty()
  readonly article: ArticleDTO;
  @ApiModelProperty()
  readonly images: ImageArticle[];
  @ApiModelProperty()
  readonly authors: AuthorArticle[];
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
}

export class ImageArticle {
  @ApiModelProperty()
  readonly height: number;
  @ApiModelProperty()
  readonly width: number;
  @ApiModelProperty()
  readonly caption: string;
  @ApiModelProperty()
  readonly url: string;
}

export class AuthorArticle {
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
    const data = await nytAPI.get(`${apiURL}${query}`);

    return new HttpResponse(true, "", data);
  }

  @Post("favorites")
  async saveArticle(
    @Body() saveArticleDTO: SaveArticleDTO,
  ): Promise<HttpResponse> {
    try {
      const { article, images, authors } = saveArticleDTO;
      let imagesToSave = [];
      let authorsToSave = [];

      images.forEach(image => {
        imagesToSave.push(this.entityManager.create(Image, image));
      });

      authors.forEach(author => {
        authorsToSave.push(this.entityManager.create(Author, authors));
      });

      const articleToSave = this.entityManager.create(Article, article);

      articleToSave.authors = authorsToSave;
      articleToSave.images = imagesToSave;
      articleToSave.favorite = true;

      await this.entityManager.save(article);

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
