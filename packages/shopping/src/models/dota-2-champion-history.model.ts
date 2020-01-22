import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Dota2ChampionHistory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  sort: string;

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
  second: string;

  @property({
    type: 'string',
    required: true,
  })
  third: string;

  @property({
    type: 'string',
    required: true,
  })
  fourth: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Dota2ChampionHistory>) {
    super(data);
  }
}

export interface Dota2ChampionHistoryRelations {
  // describe navigational properties here
}

export type Dota2ChampionHistoryWithRelations = Dota2ChampionHistory & Dota2ChampionHistoryRelations;
