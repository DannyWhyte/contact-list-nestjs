import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('contacts')
export class ContactsEntityClass {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    name: string;

    @Column('bigint')
    phone_number: number;

    @Column('text')
    email: string;

    @Column('text')
    address: string;
}