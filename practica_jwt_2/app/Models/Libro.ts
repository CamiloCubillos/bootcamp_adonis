import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Autor from './Autor';
import Editorial from './Editorial';

export default class Libro extends BaseModel {
  @column({ isPrimary: true }) public idLibro: number
  @column() public titulo: string
  @column() public isbn: string
  @column() public id_editorial: number
  @column() public id_autor: number
  @column() public id_usuario: number
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @hasMany(() => Autor, {
    localKey: 'id_autor',
    foreignKey: 'idAutor',
  })
  public autor: HasMany<typeof Autor>

  @hasMany(() => Editorial, {
    localKey: 'id_editorial',
    foreignKey: 'idEditorial',
  })
  public editorial: HasMany<typeof Editorial>
}
