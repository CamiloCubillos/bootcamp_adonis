import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuario extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_usuario').primary() 
      table.integer('tipo_documento').notNullable().references('id_tipo_doc').inTable('tipo_documentos')
      table.string('numero_documento', 30).notNullable().unique()
      table.string('nombres_usuario', 180).notNullable()
      table.string('correo', 250).notNullable().unique()
      table.string('contrasena', 255).notNullable()
      table.string('telefono', 30)
      table.string('direccion', 80)
      table.integer('perfil').notNullable().references('id_perfil').inTable('perfils')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
