import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.boolean('state')
      
      this.defer(async (db) => {
        await db.table(this.tableName).insert([
          {id:1,name:"admin"},
          {id:2,name:"user"}
        ])
      })

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
