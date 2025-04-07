import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedEventsTableAndMadeManyToOneRelationWithTheUsersTable1743992468652 implements MigrationInterface {
    name = 'CreatedEventsTableAndMadeManyToOneRelationWithTheUsersTable1743992468652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "calendaria"."priory_events_type_enum" AS ENUM('capela', 'salem', 'extemp', 'triade', 'ebano', 'anon', 'estadual', 'convocacao', 'investidura', 'tavola', 'publica')`);
        await queryRunner.query(`CREATE TABLE "calendaria"."priory_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" "calendaria"."priory_events_type_enum" NOT NULL DEFAULT 'convocacao', "horario" character varying(255) NOT NULL, "local" character varying(255) NOT NULL, "user_id" uuid, CONSTRAINT "PK_0e7c3f6e1b38b856fa7cf06e217" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendaria"."priory_events" ADD CONSTRAINT "FK_b8959c05a139ffef92aa161e665" FOREIGN KEY ("user_id") REFERENCES "calendaria"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendaria"."priory_events" DROP CONSTRAINT "FK_b8959c05a139ffef92aa161e665"`);
        await queryRunner.query(`DROP TABLE "calendaria"."priory_events"`);
        await queryRunner.query(`DROP TYPE "calendaria"."priory_events_type_enum"`);
    }

}
