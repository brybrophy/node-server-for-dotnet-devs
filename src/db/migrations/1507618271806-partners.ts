import { MigrationInterface, QueryRunner } from 'typeorm';
import partnersSeedData from '../seedData/partners';

export class partners1507618271806 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        for (const partner of partnersSeedData) {
            await queryRunner.insert('partners', partner);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.truncate('partners');
        await queryRunner.query('ALTER SEQUENCE partners_id_seq RESTART WITH 1');
    }
}
