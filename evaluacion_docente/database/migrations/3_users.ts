import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name',50).notNullable()
      table.string('second_name',50)
      table.string('surname',50).notNullable()
      table.string('second_sur_name',50)
      table.integer('document_type_id').unsigned().references('document_types.id').onDelete('CASCADE')
      table.string('document_number').unique().notNullable()
      table.string('email',100).unique().notNullable()
      table.string('password').notNullable()
      table.integer('rol_id').unsigned().references('roles.id').onDelete('CASCADE')
      table.string('phone',50).unique()
      table.boolean('state')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
