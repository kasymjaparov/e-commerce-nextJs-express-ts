import {MigrationInterface, QueryRunner} from "typeorm";

export class PhoneNameUnique1657098530931 implements MigrationInterface {
    name = 'PhoneNameUnique1657098530931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "phone"
            ADD CONSTRAINT "UQ_a00099bcfe51e6595ba30e2b194" UNIQUE ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "phone" DROP CONSTRAINT "UQ_a00099bcfe51e6595ba30e2b194"
        `);
    }

}
