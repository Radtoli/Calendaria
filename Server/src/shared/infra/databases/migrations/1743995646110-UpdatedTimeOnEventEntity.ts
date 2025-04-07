import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedTimeOnEventEntity1743995646110
  implements MigrationInterface
{
  name = 'UpdatedTimeOnEventEntity1743995646110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calendaria"."priory_events" DROP COLUMN "horario"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendaria"."priory_events" ADD "horario" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad76901923e98a3283f53467c0" ON "calendaria"."priory_events" ("type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "calendaria"."IDX_ad76901923e98a3283f53467c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendaria"."priory_events" DROP COLUMN "horario"`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendaria"."priory_events" ADD "horario" character varying(255) NOT NULL`,
    );
  }
}
