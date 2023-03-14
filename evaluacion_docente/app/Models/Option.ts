import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Option extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public option: string
  @column() private questionId: number
}
