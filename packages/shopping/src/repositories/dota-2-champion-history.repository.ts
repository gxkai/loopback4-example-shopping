import {DefaultCrudRepository} from '@loopback/repository';
import {Dota2ChampionHistory, Dota2ChampionHistoryRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class Dota2ChampionHistoryRepository extends DefaultCrudRepository<
  Dota2ChampionHistory,
  typeof Dota2ChampionHistory.prototype.id,
  Dota2ChampionHistoryRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Dota2ChampionHistory, dataSource);
  }
}
