import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectImageLink1700311796688 implements MigrationInterface {
    name = 'ProjectImageLink1700311796688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Image" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "Image" ADD CONSTRAINT "FK_63c8a589bd02b3525546ac70795" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Image" DROP CONSTRAINT "FK_63c8a589bd02b3525546ac70795"`);
        await queryRunner.query(`ALTER TABLE "Image" DROP COLUMN "projectId"`);
    }
}
