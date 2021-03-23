import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
 } from 'typeorm';

import ProductModel from './ProductModel';

@Entity('images')
export default class ImageModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'product_id' })
    product_id!: number;

    @Column()
    url!: string;

    @Column()
    filename!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    ///////////////////////////////////////////

    @ManyToOne(() => ProductModel, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product!: ProductModel;
}