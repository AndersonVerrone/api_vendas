import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entities";

@Entity("additional_addresses")
export class AdditionalAddress {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 120 })
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

  @ManyToOne(() => User, user => user.additionalAddresses)
  user: User;
}