import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Question from './Question'
import Form from './Form'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public answer : string
  @column() public isCorrect : boolean
  @column() public questionId : number
  @column() public formId: number

  @hasOne(() => Question,{
    localKey: "questionId",
    foreignKey: "id"
  })
  public question : HasOne<typeof Question>

  @hasOne(() => Form,{
    localKey:'formId',
    foreignKey:'id'
  })
  public form : HasOne<typeof Form>
}
