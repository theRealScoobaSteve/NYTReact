import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Article } from "./article.entity";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  caption: string;

  @Column()
  url: string;

  @ManyToOne(type => Article, article => article.images)
  article: Article;
}
