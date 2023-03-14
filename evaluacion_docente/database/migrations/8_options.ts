import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Options extends BaseSchema {
  protected tableName = 'options'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('option')
      table.integer('question_id').unsigned().references('forms.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
