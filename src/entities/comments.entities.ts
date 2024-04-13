import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Products } from "./products.entities";
import { User } from "./user.entities";

@Entity("comments")
export class Comments {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text", nullable: true })
  comments: string;

  @ManyToOne(() => User, user => user.comments)
  user: User;

  @ManyToOne(() => Products, product => product.comments)
  product: Products;
}