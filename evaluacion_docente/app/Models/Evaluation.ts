import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import User from './User'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() private userId : number

  @hasOne(() => User,{
    localKey:'userId',
    foreignKey:'id'
  })
  public teacher : HasOne<typeof User>

  @hasMany(() => Answer,{
    localKey:'evaluationId',
    foreignKey:'id'
  })
  public answers : HasMany<typeof Answer>
}
