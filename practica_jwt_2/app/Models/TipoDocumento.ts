import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TipoDocumento extends BaseModel {
  @column({ isPrimary: true }) public id_tipo_doc: number
  @column() public nombre_tipo_doc: string
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime
}
