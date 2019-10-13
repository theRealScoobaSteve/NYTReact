import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Author } from "./author.entity";
import { Image } from "./image.entity";

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "web_url",
  })
  webUrl: string;

  @Column()
  snippet: string;

  @Column()
  headline: string;

  @Column({
    name: "pub_date",
  })
  pubDate: string;

  @Column()
  favorite: boolean;

  @OneToMany(type => Author, author => author.article)
  authors: Author[];

  @OneToMany(type => Image, image => image.article)
  images: Image[];
}
