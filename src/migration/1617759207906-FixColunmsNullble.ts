import {MigrationInterface, QueryRunner} from "typeorm";

export class FixColunmsNullble1617759207906 implements MigrationInterface {
    name = 'FixColunmsNullble1617759207906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."url" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "profile"."url" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profile"."title" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "title" SET NOT NULL`);
    }

}
