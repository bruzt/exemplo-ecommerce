import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
 } from 'typeorm';

 import OrderModel from './OrderModel';
 import ProductModel from './ProductModel';

@Entity('orders_products')
export default class OrderProductModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'order_id' })
    order_id!: number;

    @Column({ name: 'product_id' })
    product_id!: number;

    @Column({ name: 'quantity_buyed' })
    quantity_buyed!: number;

    @Column({ name: 'product_price' })
    product_price!: number;

    @Column({ name: 'product_discount_percent' })
    product_discount_percent!: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date; 

    /////////////////////////////////////////////

    @ManyToOne(() => OrderModel, order => order.ordersProducts)
    @JoinColumn({ name: 'order_id' })
    order!: OrderModel;

    @ManyToOne(() => ProductModel, product => product.ordersProducts)
    @JoinColumn({ name: 'product_id' })
    product!: ProductModel;
}