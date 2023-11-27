import { MigrationInterface, QueryRunner } from "typeorm";

export class imageIndex1701113339834 implements MigrationInterface {
    name = 'imageIndex1701113339834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "index" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "index"`);
    }

}
