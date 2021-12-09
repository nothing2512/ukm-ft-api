import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Ukm extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public type: number

    @column()
    public name: string

    @column()
    public slug: string

    @column()
    public description: string

    @column()
    public visi: string

    @column()
    public misi: string

    @column()
    public logo: string

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
