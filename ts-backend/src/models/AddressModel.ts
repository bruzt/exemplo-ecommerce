import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import UserModel from './UserModel';

@Entity('addresses')
export default class AddressModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    street!: string;

    @Column()
    number!: string;

    @Column()
    neighborhood!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    zipcode!: string;

    @Column({ name: 'created_at' })
    created_at!: Date;

    @Column({ name: 'updated_at' })
    updated_at!: Date; 

    ///////////////////////////////////

    @ManyToOne(() => UserModel, user => user.addresses)
    @JoinColumn({ name: 'userId' })
    user!: UserModel;
}
