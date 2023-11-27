import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProject1701115128387 implements MigrationInterface {
    name = 'UpdateProject1701115128387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "isEnded"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "isActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-11-27T19:58:49.296Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "isEnded" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "image" ADD "createdAt" date NOT NULL`);
    }

}
