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
import {Article} from '../models';
import {ArticleRepository} from '../repositories';
import { authenticate } from '@loopback/authentication'

export class ArticleController {
  constructor(
    @repository(ArticleRepository)
    public articleRepository : ArticleRepository,
  ) {}

  @post('/articles', {
    responses: {
      '200': {
        description: 'Article model instance',
        content: {'application/json': {schema: getModelSchemaRef(Article)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {
            title: 'NewArticle',
            exclude: ['id', 'created'],
          }),
        },
      },
    })
    article: Omit<Article, 'id'>,
  ): Promise<Article> {
    return this.articleRepository.create(article);
  }

  @get('/articles/count', {
    responses: {
      '200': {
        description: 'Article model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.articleRepository.count(where);
  }

  @get('/articles', {
    responses: {
      '200': {
        description: 'Array of Article model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Article, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Article)) filter?: Filter<Article>,
  ): Promise<Article[]> {
    return this.articleRepository.find(filter);
  }
  @authenticate('jwt')
  @patch('/articles', {
    responses: {
      '200': {
        description: 'Article PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {partial: true}),
        },
      },
    })
    article: Article,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where<Article>,
  ): Promise<Count> {
    return this.articleRepository.updateAll(article, where);
  }

  @get('/articles/{id}', {
    responses: {
      '200': {
        description: 'Article model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Article, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Article)) filter?: Filter<Article>
  ): Promise<Article> {
    return this.articleRepository.findById(id, filter);
  }
  @patch('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Article, {partial: true}),
        },
      },
    })
    article: Article,
  ): Promise<void> {
    await this.articleRepository.updateById(id, article);
  }

  @put('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() article: Article,
  ): Promise<void> {
    await this.articleRepository.replaceById(id, article);
  }

  @del('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.articleRepository.deleteById(id);
  }
}
