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

import CategoryModel from './CategoryModel';
import ImageModel from './ImageModel';
import OrderProductModel from './OrderProductModel';

@Entity('products')
export default class ProductModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'category_id' })
    category_id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ name: 'html_body' })
    html_body!: string;

    @Column()
    price!: number;

    @Column({ name: 'quantity_stock' })
    quantity_stock!: number;

    @Column({ name: 'quantity_sold' })
    quantity_sold!: number;

    @Column({ name: 'discount_percent' })
    discount_percent!: number;

    @Column({ name: 'discount_datetime_start' })
    discount_datetime_start!: Date;

    @Column({ name: 'discount_datetime_end' })
    discount_datetime_end!: Date;

    @Column()
    tangible!: boolean;

    @Column()
    weight!: number;

    @Column()
    length!:number;

    @Column()
    height!: number;

    @Column()
    width!: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date; 

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at!: Date;

    //////////////////////////////////////////////

    @ManyToOne(() => CategoryModel, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryModel;

    @OneToMany(() => ImageModel, image => image.product)
    images?: ImageModel[];

    @OneToMany(() => OrderProductModel, ordersProducts => ordersProducts.order)
    ordersProducts!: OrderProductModel[];
}