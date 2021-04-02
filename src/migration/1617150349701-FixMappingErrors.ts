import {MigrationInterface, QueryRunner} from "typeorm";

export class FixMappingErrors1617150349701 implements MigrationInterface {
    name = 'FixMappingErrors1617150349701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_state_enum" AS ENUM('active', 'deleted', 'incomplete')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" "user_state_enum" NOT NULL DEFAULT 'incomplete', "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "category" text, "profileId" uuid, CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "profile_state_enum" AS ENUM('active', 'deleted', 'incomplete')`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" "profile_state_enum" NOT NULL DEFAULT 'incomplete', "title" character varying NOT NULL, "url" character varying NOT NULL, "profile_icon_url" character varying, "bio" character varying, "theme" jsonb NOT NULL, "view" integer NOT NULL DEFAULT '0', "userId" uuid, "linksId" uuid, CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "link_state_enum" AS ENUM('active', 'deleted', 'incomplete')`);
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" "link_state_enum" NOT NULL DEFAULT 'incomplete', "title" character varying NOT NULL, "url" character varying NOT NULL, "image_url" character varying, "is_priority" boolean NOT NULL DEFAULT false, "times_clicked" integer NOT NULL DEFAULT '0', "last_click_date" date NOT NULL, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_74758b425c46b42865bb7b984db" FOREIGN KEY ("linksId") REFERENCES "link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_74758b425c46b42865bb7b984db"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`DROP TABLE "link"`);
        await queryRunner.query(`DROP TYPE "link_state_enum"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "profile_state_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_state_enum"`);
    }

}
