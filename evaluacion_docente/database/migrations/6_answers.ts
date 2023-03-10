import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('answer')
      table.boolean('is_correct')
      table.integer('question_id').unsigned().references('questions.id').onDelete('CASCADE')
      table.boolean('state')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
