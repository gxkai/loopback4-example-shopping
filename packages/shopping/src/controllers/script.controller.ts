// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {
  get, ResponseObject
} from '@loopback/rest'
import * as cheerio from 'cheerio'
import { remoteGet } from '../api'
import { Dota2ChampionHistory, NbaChampionshipHistory } from '../models'
import { repository } from '@loopback/repository'
import { Dota2ChampionHistoryRepository, NbaChampionshipHistoryRepository } from '../repositories'
const NBA_RESPONSE: ResponseObject = {
  description: 'Nba Response'
};
const DOTA2_RESPONSE: ResponseObject = {
  description: 'Dota2 Response'
};
export class ScriptController {
  constructor(
    @repository(NbaChampionshipHistoryRepository) public nbaChampionshipHistoryRepository: NbaChampionshipHistoryRepository,
    @repository(Dota2ChampionHistoryRepository) public dota2ChampionHistoryRepository: Dota2ChampionHistoryRepository
  ) {}
  @get('/script/nba-champion-history',{
    responses: {
      '200': NBA_RESPONSE
    }
  })
  async nba():Promise<null> {
    const res = await remoteGet('https://baike.baidu.com/item/NBA%E6%80%BB%E5%86%A0%E5%86%9B');
    // 加载网页
    const $ = cheerio.load(String(res));
    // 获取网页中的数据，分别写到两个数组里面
    $('.main-content').find('table').eq(0).find('tr').each(async (index, element) => {
      if (index > 0) {
        const nbaChampionshipHistory: NbaChampionshipHistory  = new NbaChampionshipHistory()
        nbaChampionshipHistory.year = $(element).find('td').eq(0).text()
        nbaChampionshipHistory.date = $(element).find('td').eq(1).text()
        nbaChampionshipHistory.first = $(element).find('td').eq(2).text()
        nbaChampionshipHistory.score = $(element).find('td').eq(3).text()
        nbaChampionshipHistory.second = $(element).find('td').eq(4).text()
        const found = await this.nbaChampionshipHistoryRepository.findOne({where: nbaChampionshipHistory})
        if (found) {
          await this.nbaChampionshipHistoryRepository.updateById(found.id, nbaChampionshipHistory)
        } else {
          await this.nbaChampionshipHistoryRepository.create(nbaChampionshipHistory)
        }
      }
    })
    // 打印数组
    return null
  }
  @get('/script/dota2-champion-history',{
    responses: {
      '200': DOTA2_RESPONSE
    }
  })
  async dota2():Promise<null> {
    const res = await remoteGet('https://baike.baidu.com/item/DOTA2%E5%9B%BD%E9%99%85%E9%82%80%E8%AF%B7%E8%B5%9B');
    // 加载网页
    const $ = cheerio.load(String(res));
    // 获取网页中的数据，分别写到两个数组里面
    $('.main-content').find('table').eq(0).find('tr').each(async (index, element) => {
      if (index > 0) {
        const dota2ChampionHistory: Dota2ChampionHistory  = new Dota2ChampionHistory()
        dota2ChampionHistory.sort = $(element).find('td').eq(0).text()
        dota2ChampionHistory.date = $(element).find('td').eq(1).text()
        dota2ChampionHistory.first = $(element).find('td').eq(2).text()
        dota2ChampionHistory.second = $(element).find('td').eq(3).text()
        dota2ChampionHistory.third = $(element).find('td').eq(4).text()
        dota2ChampionHistory.fourth = $(element).find('td').eq(5).text()
        const found = await this.dota2ChampionHistoryRepository.findOne({where: dota2ChampionHistory})
        if (found) {
          await this.dota2ChampionHistoryRepository.updateById(found.id, dota2ChampionHistory)
        } else {
          await this.dota2ChampionHistoryRepository.create(dota2ChampionHistory)
        }
      }
    })
    // 打印数组
    return null
  }
}

