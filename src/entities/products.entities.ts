import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  getRepository,
} from "typeorm";
import { User } from "./user.entities";
import { Tag } from "./tag.entities";
import { AdditionalImages } from "./additionalImages.entities";
import { RatingProducts } from "./ratingsProducts.entities";
import { Favorites } from "./favorites.entities";
import { Sales } from "./sales.entities";
import { Comments } from "./comments.entities";

@Entity("products")
export class Products {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 120 })
  photo: string;

  @Column({ type: "int" })
  stock: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "boolean", default: false })
  promotion: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  discountPromotion: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  size: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  height: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  width: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  length: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  weight: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  cep: string;

  @Column({ type: "varchar", length: 45 })
  category: string;

  @Column({ type: "boolean", default: true })
  availability: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, nullable: true })
  averageRating: number | null;

  @Column({ type: "int", nullable: true })
  totalRatings: number | null;

  @Column({ type: "varchar", length: 120, nullable: true })
  supplier: string;

  @OneToMany(() => Comments, comment => comment.product)
  comments: Comments[];

  @Column({ type: "boolean", default: true })
  active: boolean;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => AdditionalImages, image => image.product)
  additionalImages: AdditionalImages[];

  @OneToMany(() => RatingProducts, rating => rating.product)
  ratingsProducts: RatingProducts[];

  @OneToMany(() => Favorites, favorite => favorite.product)
  favorites: Favorites[];

  @ManyToMany(() => Sales, sale => sale.products)
  @JoinTable()
  sales: Sales[];

  @AfterInsert()
  @AfterUpdate()
  @AfterRemove()
  async updateRatingDetails() {
    const ratingRepository = getRepository(RatingProducts);
    const ratings = await ratingRepository.find({ where: { product: this } });

    if (ratings.length > 0) {
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      this.averageRating = sumRatings / totalRatings;
      this.totalRatings = totalRatings;
    } else {
      this.averageRating = null;
      this.totalRatings = null;
    }

    await ratingRepository.save(this);
  }
}
