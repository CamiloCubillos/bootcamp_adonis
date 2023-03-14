import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Question from './Question'

export default class Form extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public studentId : number
  @column() public answerId : number

  @hasMany(() => Question,{
    localKey: "formId",
    foreignKey: "id"
  })
  public questions : HasMany<typeof Question>
}
