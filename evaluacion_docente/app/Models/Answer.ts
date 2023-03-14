import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import DocumentType from './DocumentType'
import Role from './Role'
import Question from './Question'
import Evaluation from './Evaluation'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public answer : string
  @column() public isCorrect : boolean
  @column() private questionId : number
  @column() private evaluationId: number

  @hasOne(() => Question,{
    localKey: "questionId",
    foreignKey: "id"
  })
  public question : HasOne<typeof Question>

  @hasOne(() => Evaluation,{
    localKey:'evaluationId',
    foreignKey:'id'
  })
  public evaluation : HasOne<typeof Evaluation>
}
