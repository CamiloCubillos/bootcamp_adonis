import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Option from './Option'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id : number
  @column() public question : string

  @hasMany(() => Option,{
    localKey:'id',
    foreignKey:'questionId'
  })
  public options : HasMany<typeof Option>

}
