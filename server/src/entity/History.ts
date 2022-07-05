import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Order_Phone } from './Order_Phone';
import { Phone } from './Phone';
import { User } from './User';

@Entity()
export class History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    amount!: number;

    @Column()
    status!: number;

    @Column()
    price!: number;

    @Column()
    date!: string;

    @ManyToOne(type => Phone, phone => phone.histories)
    phone: Phone;
}
