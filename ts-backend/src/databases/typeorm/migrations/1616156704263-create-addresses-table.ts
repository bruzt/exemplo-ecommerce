import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAddressesTable1616156704263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'addresses',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'userId',
                    type: 'int'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'neighborhood',
                    type: 'varchar'
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'state',
                    type: 'varchar'
                },
                {
                    name: 'zipcode',
                    type: 'varchar'
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

        await queryRunner.createForeignKey('addresses', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('addresses');
    }

}
