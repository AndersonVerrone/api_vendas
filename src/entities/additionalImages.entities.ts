import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entities";

@Entity("additional_images")
export class AdditionalImages {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  imageUrl: string;

  @ManyToOne(() => Products, product => product.additionalImages)
  product: Products;
}