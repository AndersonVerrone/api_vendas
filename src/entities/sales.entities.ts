import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinTable, ManyToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Products } from "./products.entities";
import { User } from "./user.entities";

enum SalesStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
  }

@Entity("sales")
export class Sales {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, user => user.sales)
  user: User;

  @ManyToMany(() => Products)
  @JoinTable()
  products: Products[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | Date | null | undefined;

  @Column({ type: "varchar", length: 100, nullable: true })
  paymentMethod: string; 

  @Column({ type: "varchar", length: 100 })
  shippingAddress: string; 

  @Column({ type: "enum", enum: SalesStatus, default: SalesStatus.PENDING })
  status: SalesStatus; 

  @Column({ type: "timestamp", nullable: true })
  shippedAt: Date; 

  @Column({ type: "timestamp", nullable: true })
  deliveredAt: Date; 

  @Column({ type: "varchar", length: 100, nullable: true })
  TrackingCode: string;
}