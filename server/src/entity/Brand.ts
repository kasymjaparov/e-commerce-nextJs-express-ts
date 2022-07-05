import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Phone } from './Phone';
import { User } from './User';

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0 })
    sum: number;

    @Column()
    date: string;

    @Column({ default: false })
    isDone: boolean;

    @OneToMany(type => Phone, phone => phone.brand)
    phones: Phone[];
}
