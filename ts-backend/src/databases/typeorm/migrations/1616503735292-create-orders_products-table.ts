import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createOrdersProductsTable1616503735292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'orders_products',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'order_id',
                    type: 'int',
                },
                {
                    name: 'product_id',
                    type: 'int',
                },
                {
                    name: 'quantity_buyed',
                    type: 'int',
                },
                {
                    name: 'product_price',
                    type: 'decimal',
                },
                {
                    name: 'product_discount_percent',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }));

        await queryRunner.createForeignKeys('orders_products', [
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'orders',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('orders_products');
    }
}
