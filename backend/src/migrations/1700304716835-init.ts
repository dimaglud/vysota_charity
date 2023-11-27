import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Init1700304716835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'project',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'title',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'description',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                    name: 'isEnded',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'createdAt',
                    type: 'date',
                },
              ],
            }),
            false,
          );

          await queryRunner.createTable(
            new Table({
              name: 'image',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'mimeType',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                    name: 'content',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'date',
                },
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE "project"`);
        queryRunner.query(`DROP TABLE "image"`);
    }
}
