import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createProductsTable1616502241340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'category_id',
                    type: 'int',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'html_body',
                    type: 'varchar',
                    default: "'<p>Em breve</p>'"
                },
                {
                    name: 'price',
                    type: 'decimal',
                },
                {
                    name: 'quantity_stock',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'quantity_sold',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'discount_percent',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'discount_datetime_start',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'discount_datetime_end',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'tangible',
                    type: 'bool',
                },
                {
                    name: 'weight',
                    type: 'float',
                },
                {
                    name: 'length',
                    type: 'float',
                },{
                    name: 'height',
                    type: 'float',
                },{
                    name: 'width',
                    type: 'float',
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
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey('products', new TableForeignKey({
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('products');
    }
}
