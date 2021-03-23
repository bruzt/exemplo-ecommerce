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
import AddressModel from './AddressModel';
import OrderProductModel from './OrderProductModel';

@Entity('orders')
export default class OrderModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    user_id!: number;

    @Column({ name: 'address_id' })
    address_id!: number;

    @Column({ name: 'freight_name' })
    freight_name!: string;

    @Column({ name: 'freight_price' })
    freight_price!: number;

    @Column({ name: 'total_price' })
    total_price!: number;

    @Column({ name: 'payment_method' })
    payment_method!: string;

    @Column()
    status!: string;

    @Column({ name: 'boleto_url' })
    boleto_url!: string;

    @Column({ name: 'tracking_code' })
    tracking_code!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date; 

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at!: Date;

    //////////////////////////////////////////////

    @ManyToOne(() => UserModel, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user!: UserModel;

    @ManyToOne(() => AddressModel, address => address.orders)
    @JoinColumn({ name: 'address_id' })
    address!: AddressModel;

    @OneToMany(() => OrderProductModel, ordersProducts => ordersProducts.order)
    ordersProducts!: OrderProductModel[];
}