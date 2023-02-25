import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nombre', 100).notNullable()
      table.string('apellido',100).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.integer('perfil').unsigned().references('perfils.id').onDelete('CASCADE')
      table.integer('tipo_id').unsigned().notNullable()
      table.integer('numero_id').unsigned().notNullable()
      table.string('barrio',100).notNullable()
      table.string('municipio',100).notNullable() 
      table.string('departamento',100).notNullable
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
