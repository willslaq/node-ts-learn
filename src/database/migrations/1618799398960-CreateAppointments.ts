import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1618799398960 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
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
