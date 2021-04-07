import {MigrationInterface, QueryRunner} from "typeorm";

export class FixRelationMap1617758815054 implements MigrationInterface {
    name = 'FixRelationMap1617758815054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_74758b425c46b42865bb7b984db"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "linksId"`);
        await queryRunner.query(`ALTER TABLE "link" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_3bfc8c1aaec1395cc148268d3cd" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_3bfc8c1aaec1395cc148268d3cd"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "linksId" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_74758b425c46b42865bb7b984db" FOREIGN KEY ("linksId") REFERENCES "link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
