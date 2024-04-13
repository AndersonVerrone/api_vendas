import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entities";

@Entity("tag")
export class Tag {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ type: "varchar", length: 50 })
    name: string;
  
    @ManyToMany(() => Products, product => product.tags)
    products: Products[];
}