import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { Phone } from './Phone';
import { User } from './User';

@Entity()
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    amount: number;

    @Column()
    public orderId: number;

    @Column()
    public phoneId: number

    @ManyToOne(() => Phone, phone => phone.phones_users)
    public phone!: Phone;

    @ManyToOne(() => User, user => user.phones_users)
    public user!: User;
}
