import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1743957723622 implements MigrationInterface {
  name = 'CreateUsersTable1743957723622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calendaria"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "prd_number" integer NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "prd_name" character varying(255) NOT NULL, "prd_adress_street" character varying(255) NOT NULL, "prd_adress_number" character varying(255) NOT NULL, "prd_adress_city" character varying(255) NOT NULL, "prd_adress_state" character varying(255) NOT NULL, "prd_adress_zip_code" character varying(255) NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_226c6440e251a2ba4864d19e01" ON "calendaria"."users" ("prd_number") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "calendaria"."IDX_226c6440e251a2ba4864d19e01"`,
    );
    await queryRunner.query(`DROP TABLE "calendaria"."users"`);
  }
}
