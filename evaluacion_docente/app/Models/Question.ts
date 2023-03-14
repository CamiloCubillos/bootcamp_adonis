import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'
import Answer from './Answer'
import Option from './Option'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id : number
  @column() public question : string
  @column() public formId : number

  @hasMany(() => Option,{
    localKey:'questionId',
    foreignKey:'id'
  })
  public options : HasMany<typeof Option>

}
