import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ukms extends BaseSchema {
    protected tableName = 'ukms'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.integer('type')
            table.string('name')
            table.string('slug')
            table.text('description')
            table.string('visi')
            table.text('misi')
            table.string('logo')

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
