import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class NbaChampionshipHistory extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  year: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  first: string;

  @property({
    type: 'string',
    required: true,
  })
  score: string;

  @property({
    type: 'string',
    required: true,
  })
  second: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<NbaChampionshipHistory>) {
    super(data);
  }
}

export interface NbaChampionshipHistoryRelations {
  // describe navigational properties here
}

export type NbaChampionshipHistoryWithRelations = NbaChampionshipHistory & NbaChampionshipHistoryRelations;
