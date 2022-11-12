import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn({ name: 'userid' })
    userid: number;

    @Column(({ name: 'username' }))
    username: string;

    @Column(({ name: 'password' }))
    password: string;
}
