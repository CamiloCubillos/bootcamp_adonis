import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Book extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public title: string
  @column() public author: number
  @column() public editorial: string
  @column() public numero_paginas: string
  @column() public formato: string
  @column.dateTime({ autoCreate: true }) public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) public updatedAt: DateTime

  @belongsTo(() => User,{
    localKey:"author",
    foreignKey:"id"
  })
  public autor : BelongsTo<typeof User>
}
