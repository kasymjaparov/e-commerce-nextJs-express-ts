import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, OneToMany } from 'typeorm';
import { Basket } from './Basket';
import { Order } from './Order';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false, default: null })
  password!: string;

  @Column({ nullable: false })
  role!: number;

  @OneToMany(type => Order, order => order.order)
  orders: Order[];

  @OneToMany(() => Basket, basket => basket.user)
  public phones_users: Basket[];
}
