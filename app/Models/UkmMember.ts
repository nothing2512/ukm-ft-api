import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class UkmMember extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public ukmId: number

    @column()
    public name: string

    @column()
    public position: number

    @column()
    public photo: string

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
