import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1685493416087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns:[
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'login',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '32',
                        isNullable: false,
                        isUnique: true                    
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
