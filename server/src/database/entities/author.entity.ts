import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Article } from "./article.entity";

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "first_name",
  })
  firstName: string;

  @Column({
    name: "last_name",
  })
  lastName: string;

  @Column()
  role: string;

  @Column()
  organization: string;

  @Column()
  title: string;

  @ManyToOne(type => Article, article => article.authors)
  article: Article;
}
