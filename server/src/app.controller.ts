import { Controller, Post, Body } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpResponse } from "./http.response";

import { nytAPI } from "./services/nyt.api";

require("dotenv").config();

const apiURL = `articlesearch.json?api-key=${process.env.NYT_KEY}&q=`;

export class FetchArticleDTO {
  readonly query: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("articles")
  async fetchArticles(@Body() fetchArticleDTO: FetchArticleDTO): Promise<any> {
    try {
      const { query } = fetchArticleDTO;
      const data = await nytAPI.get(`${apiURL}${query}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
