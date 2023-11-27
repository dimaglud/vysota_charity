import { MigrationInterface, QueryRunner } from "typeorm";

export class projectimageLink1700311796688 implements MigrationInterface {
    name = 'projectimageLink1700311796688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_63c8a589bd02b3525546ac70795" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_63c8a589bd02b3525546ac70795"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "projectId"`);
    }
}
