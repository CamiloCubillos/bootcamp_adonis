import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TipoDocumentos extends BaseSchema {
  protected tableName = 'tipo_documentos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_tipo_doc').primary()
      table.string('nombre_tipo_doc', 80).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
