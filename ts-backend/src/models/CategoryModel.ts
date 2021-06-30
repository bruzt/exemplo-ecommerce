import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, 
 } from 'typeorm';

 import ProductModel from './ProductModel';

@Entity('categories')
export default class CategoryModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ name: 'parent_id' })
    parent_id?: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date; 

    ///////////////////////////////////////////

    @OneToMany(() => ProductModel, product => product.category)
    products?: ProductModel[];
}