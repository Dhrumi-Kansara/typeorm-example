import { Entity, BaseEntity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: String;

  @Column()
  last_name: String;

  @Column({
    unique: true
  })
  email: String;

  @Column({
    unique: true,
    length: 10
  })
  card_number: String;


  
}
