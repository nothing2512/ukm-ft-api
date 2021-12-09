import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UkmMembers extends BaseSchema {
    protected tableName = 'ukm_members'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.bigInteger('ukm_id');
            table.string('name');
            table.integer('position');
            table.string('photo');

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', {useTz: true})
            table.timestamp('updated_at', {useTz: true})
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
