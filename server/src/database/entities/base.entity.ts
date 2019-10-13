import {
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "created_at",
  })
  createdAt: Date;

  @Column({
    default: new Date(),
    name: "updated_at",
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date();
  }
}
