import { Entity, hasMany, model, property } from '@loopback/repository'
import { Order } from './order.model'
import { Article } from './article.model'

@model({
    settings: {
        indexes: {
            uniqueName: {
                keys: {
                    name: 1,
                },
                options: {
                    unique: true,
                },
            },
        },
    },
})export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Article)
  articles: Article[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
