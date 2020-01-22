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
import {Dota2ChampionHistory} from '../models';
import {Dota2ChampionHistoryRepository} from '../repositories';

export class Dota2ChampionHistoryController {
  constructor(
    @repository(Dota2ChampionHistoryRepository)
    public dota2ChampionHistoryRepository : Dota2ChampionHistoryRepository,
  ) {}

  @post('/dota2champion-histories', {
    responses: {
      '200': {
        description: 'Dota2ChampionHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dota2ChampionHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dota2ChampionHistory, {
            title: 'NewDota2ChampionHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    dota2ChampionHistory: Omit<Dota2ChampionHistory, 'id'>,
  ): Promise<Dota2ChampionHistory> {
    return this.dota2ChampionHistoryRepository.create(dota2ChampionHistory);
  }

  @get('/dota2champion-histories/count', {
    responses: {
      '200': {
        description: 'Dota2ChampionHistory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Dota2ChampionHistory)) where?: Where<Dota2ChampionHistory>,
  ): Promise<Count> {
    return this.dota2ChampionHistoryRepository.count(where);
  }

  @get('/dota2champion-histories', {
    responses: {
      '200': {
        description: 'Array of Dota2ChampionHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dota2ChampionHistory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dota2ChampionHistory)) filter?: Filter<Dota2ChampionHistory>,
  ): Promise<Dota2ChampionHistory[]> {
    return this.dota2ChampionHistoryRepository.find(filter);
  }

  @patch('/dota2champion-histories', {
    responses: {
      '200': {
        description: 'Dota2ChampionHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dota2ChampionHistory, {partial: true}),
        },
      },
    })
    dota2ChampionHistory: Dota2ChampionHistory,
    @param.query.object('where', getWhereSchemaFor(Dota2ChampionHistory)) where?: Where<Dota2ChampionHistory>,
  ): Promise<Count> {
    return this.dota2ChampionHistoryRepository.updateAll(dota2ChampionHistory, where);
  }

  @get('/dota2champion-histories/{id}', {
    responses: {
      '200': {
        description: 'Dota2ChampionHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dota2ChampionHistory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Dota2ChampionHistory)) filter?: Filter<Dota2ChampionHistory>
  ): Promise<Dota2ChampionHistory> {
    return this.dota2ChampionHistoryRepository.findById(id, filter);
  }

  @patch('/dota2champion-histories/{id}', {
    responses: {
      '204': {
        description: 'Dota2ChampionHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dota2ChampionHistory, {partial: true}),
        },
      },
    })
    dota2ChampionHistory: Dota2ChampionHistory,
  ): Promise<void> {
    await this.dota2ChampionHistoryRepository.updateById(id, dota2ChampionHistory);
  }

  @put('/dota2champion-histories/{id}', {
    responses: {
      '204': {
        description: 'Dota2ChampionHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dota2ChampionHistory: Dota2ChampionHistory,
  ): Promise<void> {
    await this.dota2ChampionHistoryRepository.replaceById(id, dota2ChampionHistory);
  }

  @del('/dota2champion-histories/{id}', {
    responses: {
      '204': {
        description: 'Dota2ChampionHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dota2ChampionHistoryRepository.deleteById(id);
  }
}
