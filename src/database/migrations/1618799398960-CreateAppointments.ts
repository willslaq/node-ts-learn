import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1618799398960 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }

}

/**
 * Linha do tempo
 *
 * 1ª Semana: Agendamentos
 * 2ª Semana: Usuários
 * 3ª Semana: Edição de Agendamentos (NOVO DEV)
 * 4ª Semana: Compras
 *
 * Como um git para banco de dados, cria uma linha do tempo para o banco
 */
