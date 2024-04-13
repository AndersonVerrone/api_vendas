import * as bcrypt from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./products.entities";
import { RatingProducts } from "./ratingsProducts.entities";
import { Favorites } from "./favorites.entities";
import { AdditionalAddress } from "./additionalAddress.entities";
import { Sales } from "./sales.entities";
import { Comments } from "./comments.entities";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 45 })
  cpfOrCnpj: string;

  @Column({ type: "varchar", length: 45 })
  phone: string;

  @Column({ type: "varchar", length: 120 })
  photo: string;

  @Column({ type: "varchar", length: 60 })
  address: string;

  @Column({ type: "varchar", length: 10 })
  address_number: string;

  @Column({ type: "varchar", length: 120 })
  address_complement: string;

  @Column({ type: "varchar", length: 10 })
  cep: string;

  @Column({ type: "varchar", length: 45 })
  city: string;

  @Column({ type: "varchar", length: 45 })
  state: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

  @Column({ type: "varchar", length: 45, nullable: true })
  nickname: string;

  @Column({ type: "boolean", default: true })
  profileVisibility: boolean;

  @Column({ type: "date", nullable: true })
  dateOfBirth: Date;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  facebook: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  twitter: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  instagram: string;

  @Column({ type: "boolean", default: true })
  newsletter: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | Date | null | undefined;

  @OneToMany(() => Products, product => product.user)
  products: Products[];

  @OneToMany(() => RatingProducts, rating => rating.user)
  ratingsProducts: RatingProducts[];

  @OneToMany(() => Favorites, favorite => favorite.user)
  favoriteProducts: Favorites[];

  @OneToMany(() => AdditionalAddress, address => address.user)
  additionalAddresses: AdditionalAddress[];

  @BeforeInsert()
  hashUserPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @OneToMany(() => Sales, sale => sale.user)
  sales: Sales[];

  @OneToMany(() => Comments, comment => comment.user)
  comments: Comments[];

  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = bcrypt.getRounds(this.password);
    if (!isEncrypted) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}