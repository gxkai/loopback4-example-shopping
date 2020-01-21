import { belongsTo, Entity, model, property } from '@loopback/repository'
import { Category } from './category.model'

@model({settings: {strict: false}})
export class Article extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id?: string;
  @belongsTo(() => Category)
  categoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    default: new Date()
  })
  created: string;

  @property({
    type: 'string',
    required: true,
  })
  html: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Article>) {
    super(data);
  }
}

export interface ArticleRelations {
  // describe navigational properties here
}

export type ArticleWithRelations = Article & ArticleRelations;
