import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DocumentTypes extends BaseSchema {
  protected tableName = 'document_types'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.boolean('state')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
