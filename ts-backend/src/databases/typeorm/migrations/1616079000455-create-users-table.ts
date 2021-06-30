import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1616079000455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'admin',
                    type: 'bool',
                    default: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'reset_password_token',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'reset_password_expires',
                    type: 'timestamp',
                    isNullable: true,
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
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('users');
    }
}
