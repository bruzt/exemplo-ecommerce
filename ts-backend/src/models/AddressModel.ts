import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import UserModel from './UserModel';
import OrderModel from './OrderModel';

@Entity('addresses')
export default class AddressModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    user_id!: number;

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

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date; 

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at!: Date;

    ///////////////////////////////////

    @ManyToOne(() => UserModel, user => user.addresses)
    @JoinColumn({ name: 'user_id' })
    user!: UserModel;

    @OneToMany(() => OrderModel, order => order.address)
    orders!: OrderModel[];
}
