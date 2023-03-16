import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('question')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
