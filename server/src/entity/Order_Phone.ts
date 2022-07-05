import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { Phone } from './Phone';
import { User } from './User';

@Entity()
export class Order_Phone extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    amount: number;

    @Column()
    public orderId: number;

    @Column()
    public phoneId: number

    @ManyToOne(() => Phone, phone => phone.phones_orders)
    public phone!: Phone;

    @ManyToOne(() => Order, order => order.phones_orders)
    public order!: Order;
}
