import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id : number
  @column() public question : string
  @column() public formId : number

  @hasOne(() => Form,{
    localKey:"formId",
    foreignKey:"id"
  })
  public form : HasOne<typeof Form>

  @hasMany(() => Answer,{
    localKey: "formId",
    foreignKey: "id"
  })
  public ansers : HasMany<typeof Answer>

}
