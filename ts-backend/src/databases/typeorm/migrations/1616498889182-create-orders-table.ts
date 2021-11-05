import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createOrdersTable1616498889182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "address_id",
            type: "int",
          },
          {
            name: "freight_name",
            type: "varchar",
          },
          {
            name: "freight_price",
            type: "decimal",
          },
          {
            name: "total_price",
            type: "decimal",
          },
          {
            name: "payment_method",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "varchar",
            default: "'select_payment_method'",
          },
          {
            name: "boleto_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tracking_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKeys("orders", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["address_id"],
        referencedTableName: "addresses",
        referencedColumnNames: ["id"],
        onUpdate: "CASCADE",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orders");
  }
}
