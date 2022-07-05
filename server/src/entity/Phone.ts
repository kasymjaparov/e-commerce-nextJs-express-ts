import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Basket } from './Basket';
import { Brand } from './Brand';
import { History } from './History';
import { Order_Phone } from './Order_Phone';
import { User } from './User';

@Entity()
export class Phone extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rom: string;

    @Column()
    logo: string;

    @Column()
    price: number;

    @Column()
    amount: number;

    @ManyToOne(type => Brand, brand => brand.phones)
    brand: Brand;

    @OneToMany(type => History, history => history.phone)
    histories: History[];

    @OneToMany(() => Order_Phone, order_phone => order_phone.phone)
    public phones_orders: Order_Phone[];

    @OneToMany(() => Basket, basket => basket.phone)
    public phones_users: Basket[];
}
