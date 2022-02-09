
import { Entity, Column, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { Person } from "./utils/Person"
import { Client } from "./Client"


@Entity('banker')
export class Banker extends Person {

  @Column({ 
    length: 10
  })
  employee_number: string;

  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id'
    }
  })
  clients: Client[]
 
  @CreateDateColumn()
  created_at: true;

  @UpdateDateColumn()
  update_at: true;
}
