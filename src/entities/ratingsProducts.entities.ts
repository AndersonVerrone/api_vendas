import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Products } from "./products.entities";
import { User } from "./user.entities";

@Entity("ratingsProducts")
export class RatingProducts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "int" })
  rating: number;

  @ManyToOne(() => User, user => user.ratingsProducts)
  user: User;

  @ManyToOne(() => Products, product => product.ratingsProducts)
  product: Products;
}