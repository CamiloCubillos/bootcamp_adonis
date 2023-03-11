import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm' 

import Perfil from './Perfil'
import TipoDocumento from './TipoDocumento'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true }) public idUsuario: number
  @column() public tipo_documento: number
  @column() public numero_documento: string
  @column() public nombres_usuario: string
  @column() public correo: string
  @column() public contrasena: string
  @column() public telefono: string
  @column() public direccion: string
  @column() public perfil: number
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @hasMany(() => Perfil, {
    localKey: 'perfil',
    foreignKey: 'idPerfil',
  })
  public perfilUsuario: HasMany<typeof Perfil>

  @hasMany(() => TipoDocumento, {
    localKey: 'tipo_documento',
    foreignKey: 'id_tipo_doc',
  })
  public documentoUsuario: HasMany<typeof TipoDocumento>
}
