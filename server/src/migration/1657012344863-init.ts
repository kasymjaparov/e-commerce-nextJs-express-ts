import {MigrationInterface, QueryRunner} from "typeorm";

export class init1657012344863 implements MigrationInterface {
    name = 'init1657012344863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brand" (
                "id" SERIAL NOT NULL,
                "sum" integer NOT NULL DEFAULT '0',
                "date" character varying NOT NULL,
                "isDone" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "history" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL DEFAULT '0',
                "status" integer NOT NULL,
                "price" integer NOT NULL,
                "date" character varying NOT NULL,
                "phoneId" integer,
                CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" integer NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "id" SERIAL NOT NULL,
                "sum" integer NOT NULL DEFAULT '0',
                "date" character varying NOT NULL,
                "isDone" boolean NOT NULL DEFAULT false,
                "orderId" integer,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order__phone" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL DEFAULT '0',
                "orderId" integer NOT NULL,
                "phoneId" integer NOT NULL,
                CONSTRAINT "PK_06ed377f21cd3753452b0aa7706" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "phone" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "rom" character varying NOT NULL,
                "logo" character varying NOT NULL,
                "price" integer NOT NULL,
                "amount" integer NOT NULL,
                "brandId" integer,
                CONSTRAINT "PK_f35e6ee6c1232ce6462505c2b25" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "basket" (
                "id" SERIAL NOT NULL,
                "amount" integer NOT NULL DEFAULT '0',
                "orderId" integer NOT NULL,
                "phoneId" integer NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "history"
            ADD CONSTRAINT "FK_8fba0e208f882579e9f3b422a56" FOREIGN KEY ("phoneId") REFERENCES "phone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_b075313d4d7e1c12f1a6e6359e8" FOREIGN KEY ("orderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order__phone"
            ADD CONSTRAINT "FK_ede0eba1246cc1625c26d4a340c" FOREIGN KEY ("phoneId") REFERENCES "phone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order__phone"
            ADD CONSTRAINT "FK_60f850ab4e8b7b382ac66b2eced" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "phone"
            ADD CONSTRAINT "FK_47e6d3bc75e2cd3404fcd1f54ab" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "basket"
            ADD CONSTRAINT "FK_b8b53862b6869cd315cb0c5738e" FOREIGN KEY ("phoneId") REFERENCES "phone"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "basket"
            ADD CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "basket" DROP CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c"
        `);
        await queryRunner.query(`
            ALTER TABLE "basket" DROP CONSTRAINT "FK_b8b53862b6869cd315cb0c5738e"
        `);
        await queryRunner.query(`
            ALTER TABLE "phone" DROP CONSTRAINT "FK_47e6d3bc75e2cd3404fcd1f54ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "order__phone" DROP CONSTRAINT "FK_60f850ab4e8b7b382ac66b2eced"
        `);
        await queryRunner.query(`
            ALTER TABLE "order__phone" DROP CONSTRAINT "FK_ede0eba1246cc1625c26d4a340c"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_b075313d4d7e1c12f1a6e6359e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "history" DROP CONSTRAINT "FK_8fba0e208f882579e9f3b422a56"
        `);
        await queryRunner.query(`
            DROP TABLE "basket"
        `);
        await queryRunner.query(`
            DROP TABLE "phone"
        `);
        await queryRunner.query(`
            DROP TABLE "order__phone"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "history"
        `);
        await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }

}
