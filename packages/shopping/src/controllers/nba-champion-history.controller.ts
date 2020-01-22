import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {NbaChampionshipHistory} from '../models';
import {NbaChampionshipHistoryRepository} from '../repositories';

export class NbaChampionHistoryController {
  constructor(
    @repository(NbaChampionshipHistoryRepository)
    public nbaChampionshipHistoryRepository : NbaChampionshipHistoryRepository,
  ) {}

  @post('/nba-championship-histories', {
    responses: {
      '200': {
        description: 'NbaChampionshipHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(NbaChampionshipHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NbaChampionshipHistory, {
            title: 'NewNbaChampionshipHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    nbaChampionshipHistory: Omit<NbaChampionshipHistory, 'id'>,
  ): Promise<NbaChampionshipHistory> {
    return this.nbaChampionshipHistoryRepository.create(nbaChampionshipHistory);
  }

  @get('/nba-championship-histories/count', {
    responses: {
      '200': {
        description: 'NbaChampionshipHistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(NbaChampionshipHistory)) where?: Where<NbaChampionshipHistory>,
  ): Promise<Count> {
    return this.nbaChampionshipHistoryRepository.count(where);
  }

  @get('/nba-championship-histories', {
    responses: {
      '200': {
        description: 'Array of NbaChampionshipHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(NbaChampionshipHistory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(NbaChampionshipHistory)) filter?: Filter<NbaChampionshipHistory>,
  ): Promise<NbaChampionshipHistory[]> {
    return this.nbaChampionshipHistoryRepository.find(filter);
  }

  @patch('/nba-championship-histories', {
    responses: {
      '200': {
        description: 'NbaChampionshipHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NbaChampionshipHistory, {partial: true}),
        },
      },
    })
    nbaChampionshipHistory: NbaChampionshipHistory,
    @param.query.object('where', getWhereSchemaFor(NbaChampionshipHistory)) where?: Where<NbaChampionshipHistory>,
  ): Promise<Count> {
    return this.nbaChampionshipHistoryRepository.updateAll(nbaChampionshipHistory, where);
  }

  @get('/nba-championship-histories/{id}', {
    responses: {
      '200': {
        description: 'NbaChampionshipHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(NbaChampionshipHistory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(NbaChampionshipHistory)) filter?: Filter<NbaChampionshipHistory>
  ): Promise<NbaChampionshipHistory> {
    return this.nbaChampionshipHistoryRepository.findById(id, filter);
  }

  @patch('/nba-championship-histories/{id}', {
    responses: {
      '204': {
        description: 'NbaChampionshipHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NbaChampionshipHistory, {partial: true}),
        },
      },
    })
    nbaChampionshipHistory: NbaChampionshipHistory,
  ): Promise<void> {
    await this.nbaChampionshipHistoryRepository.updateById(id, nbaChampionshipHistory);
  }

  @put('/nba-championship-histories/{id}', {
    responses: {
      '204': {
        description: 'NbaChampionshipHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nbaChampionshipHistory: NbaChampionshipHistory,
  ): Promise<void> {
    await this.nbaChampionshipHistoryRepository.replaceById(id, nbaChampionshipHistory);
  }

  @del('/nba-championship-histories/{id}', {
    responses: {
      '204': {
        description: 'NbaChampionshipHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.nbaChampionshipHistoryRepository.deleteById(id);
  }
}
