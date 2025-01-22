import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1737535933044 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();

        try {
            // '-' 문자를 0으로 변환합니다.
            await queryRunner.query(`
                UPDATE weather
                SET perceived_temperature = '0'
                WHERE perceived_temperature = '-';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET precipitation = '0'
                WHERE precipitation = '-';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET precipitation_probability = '0'
                WHERE precipitation_probability = '-';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET humidity = '0'
                WHERE humidity = '-';
            `);

            // 데이터를 정리합니다.
            await queryRunner.query(`
                UPDATE weather
                SET perceived_temperature = regexp_replace(perceived_temperature, '℃', '', 'g')::INTEGER
                WHERE perceived_temperature LIKE '%℃';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET precipitation_probability = regexp_replace(precipitation_probability, '%', '', 'g')::INTEGER
                WHERE precipitation_probability LIKE '%';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET humidity = regexp_replace(humidity, '%', '', 'g')::INTEGER
                WHERE humidity LIKE '%';
            `);

            // 컬럼 타입을 변경합니다.
            await queryRunner.query(`
                ALTER TABLE weather
                ALTER COLUMN perceived_temperature TYPE INTEGER USING (perceived_temperature::INTEGER),
                ALTER COLUMN precipitation TYPE INTEGER USING (precipitation::INTEGER),
                ALTER COLUMN precipitation_probability TYPE INTEGER USING (precipitation_probability::INTEGER),
                ALTER COLUMN humidity TYPE INTEGER USING (humidity::INTEGER);
            `);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();

        try {
            // 컬럼 타입을 되돌립니다.
            await queryRunner.query(`
                ALTER TABLE weather
                ALTER COLUMN perceived_temperature TYPE VARCHAR USING (perceived_temperature::VARCHAR),
                ALTER COLUMN precipitation TYPE VARCHAR USING (precipitation::VARCHAR),
                ALTER COLUMN precipitation_probability TYPE VARCHAR USING (precipitation_probability::VARCHAR),
                ALTER COLUMN humidity TYPE VARCHAR USING (humidity::VARCHAR);
            `);

            // 데이터 변경을 되돌립니다.
            await queryRunner.query(`
                UPDATE weather
                SET perceived_temperature = '-'
                WHERE perceived_temperature = '0';
            `);

            await queryRunner.query(`
                UPDATE weather
                SET precipitation = '-'
                WHERE precipitation = '0';
            `);

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
