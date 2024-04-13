import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entities";
import { User } from "./user.entities";

@Entity("favorites")
export class Favorites {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, user => user.favoriteProducts)
  user: User;

  @ManyToOne(() => Products, product => product.favorites)
  product: Products;
}