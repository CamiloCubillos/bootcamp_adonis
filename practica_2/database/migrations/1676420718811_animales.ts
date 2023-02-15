import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Animales extends BaseSchema {
  protected tableName = 'animals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('codigo_animal').primary().unsigned()
      table.string('nombre').notNullable()
      table.integer('especie').notNullable()
      table.integer('raza').notNullable()
      table.integer('genero').notNullable()
      table.integer('edad').notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
