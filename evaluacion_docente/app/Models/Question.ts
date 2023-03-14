import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Option from './Option'
import Form from './Form'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id : number
  @column() public question : string
  @column() public formId : number

  @belongsTo(() => Form,{
    localKey:'formId',
    foreignKey:'id'
  })
  public form : BelongsTo<typeof Form>

  @hasMany(() => Option,{
    localKey:'id',
    foreignKey:'questionId'
  })
  public options : HasMany<typeof Option>

}
