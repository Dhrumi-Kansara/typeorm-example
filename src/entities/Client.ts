import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Person } from "./utils/Person"
import { Transaction } from "./Transacton";
import { Banker } from "./Banker";

@Entity('client')
export class Client extends Person {

  @Column({
    default: true,
    name: "active"
  })
  is_active: boolean;

  @Column({
    type: "simple-json",
    nullable: true
  })
  additional_info: {
    age: number,
    hair_color: string
  };

  @Column({
    type: "simple-array",
    default: []
  })
  family_members: string[];

  @OneToMany(
    () => Transaction,
    transaction => transaction.client
  )
  transactions: Transaction[]

  @ManyToMany(
    () => Banker, 
  )
  bankers: Banker[]

  @CreateDateColumn()
  created_at: true;

  @UpdateDateColumn()
  update_at: true;

  
  @Column({
    type: "numeric"
  })
  balance: number;  
}
