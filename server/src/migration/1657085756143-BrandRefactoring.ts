import {MigrationInterface, QueryRunner} from "typeorm";

export class BrandRefactoring1657085756143 implements MigrationInterface {
    name = 'BrandRefactoring1657085756143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "sum"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "isDone"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "isDone" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "date" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "sum" integer NOT NULL DEFAULT '0'
        `);
    }

}
