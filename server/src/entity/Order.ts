import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Order_Phone } from './Order_Phone';
import { User } from './User';

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    sum: number;

    @Column()
    date: string;

    @Column({ default: false })
    isDone: boolean;

    @ManyToOne(type => User, user => user.orders)
    order: Order;

    @OneToMany(() => Order_Phone, order_phone => order_phone.order)
    public phones_orders!: Order_Phone[];
}
