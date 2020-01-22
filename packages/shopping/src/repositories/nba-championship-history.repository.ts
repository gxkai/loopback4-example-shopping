import {DefaultCrudRepository} from '@loopback/repository';
import {NbaChampionshipHistory, NbaChampionshipHistoryRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NbaChampionshipHistoryRepository extends DefaultCrudRepository<
  NbaChampionshipHistory,
  typeof NbaChampionshipHistory.prototype.id,
  NbaChampionshipHistoryRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(NbaChampionshipHistory, dataSource);
  }
}
