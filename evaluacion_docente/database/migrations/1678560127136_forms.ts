import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('answer_id').unsigned().references('answers.id').onDelete('CASCADE')
      table.boolean('state')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
