import { Injectable } from '@nestjs/common';
import { members, member } from '../app.service';
import { StatsRepository } from '../stats.repository';
import { Stats } from '../stats.entity';

@Injectable()
export class SeasonsService {
  statsRepository;
  constructor() {
    this.statsRepository = StatsRepository.getInstance();
  }

  async getMmr() {
    const membersMmrs = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const mmrs = stats.getMmrsBySeasons().map(mmr => (mmr === 0 ? NaN : mmr));
      const mmr = stats.ranked['mmr'];
      mmrs.push(mmr === 0 ? NaN : mmr);
      return { [memberName]: mmrs.toString() };
    });
    return Object.assign({}, ...membersMmrs);
  }

  async getKillRatio() {
    const membersRatios = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kills = stats.getKillsBySeasons();
      const deaths = stats.getDeathsBySeasons();
      const ratios = kills
        .map((kill, index) => {
          return kill === 0
            ? NaN
            : deaths[index] === 0
            ? Infinity
            : kill / deaths[index];
        })
        .splice(8);
      const kill = stats.ranked['allkills'];
      const death = stats.ranked['alldeaths'];
      ratios.push(kill === 0 ? NaN : death === 0 ? Infinity : kill / death);
      return { [memberName]: ratios.toString() };
    });
    return Object.assign({}, ...membersRatios);
  }
}
