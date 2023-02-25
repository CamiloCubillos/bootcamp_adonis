import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Perfil from 'App/Models/Perfil'
import Book from 'App/Models/Book'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public nombre: string
  @column() public apellido: string
  @column() public email: string
  @column({ serializeAs: null }) public password: string
  @column() public perfil: number
  @column() public tipo_id: number
  @column() public numero_id: string
  @column() public barrio: string
  @column() public municipio: string
  @column() public departamento: string
  @column() public rememberMeToken?: string
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @hasOne(() => Perfil, {
    localKey: 'perfil',
    foreignKey: 'id'
  })
  public rol : HasOne<typeof Perfil>

  @hasMany(() => Book, {
    localKey: 'id',
    foreignKey: 'author'
  })
  public author : HasMany<typeof Book>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
