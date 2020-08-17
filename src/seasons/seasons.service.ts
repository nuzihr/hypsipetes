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
    const result = [{"name":"Y2S2"},{"name":"Y2S3"},{"name":"Y2S4"},{"name":"Y3S1"},{"name":"Y3S2"},{"name":"Y3S3"},{"name":"Y3S4"},
      {"name":"Y4S1"},{"name":"Y4S2"},{"name":"Y4S3"},{"name":"Y4S4"},{"name":"Y5S1"},{"name":"Y5S2"}];
    members.forEach(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      stats.getMmrsBySeasons().forEach((mmr,index) => {
        if (mmr) result[index][memberName] = mmr;
      });
      const mmr = stats.ranked['mmr'];
      if (mmr) result[result.length-1][memberName] = mmr;
    });
    return result;
  }

  async getKillRatio() {
    const result = [{"name":"Y2S2"},{"name":"Y2S3"},{"name":"Y2S4"},{"name":"Y3S1"},{"name":"Y3S2"},{"name":"Y3S3"},{"name":"Y3S4"},
      {"name":"Y4S1"},{"name":"Y4S2"},{"name":"Y4S3"},{"name":"Y4S4"},{"name":"Y5S1"},{"name":"Y5S2"}];
    members.forEach((memberName) => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kills = stats.getKillsBySeasons();
      const deaths = stats.getDeathsBySeasons();
      kills.forEach((kill, index) => {
          if (kill !== 0 && deaths[index] !== 0) result[index][memberName] = kill/deaths[index];
        });
      const kill = stats.ranked['allkills'];
      const death = stats.ranked['alldeaths'];
      if (kill !==0 && death !==0) result[result.length-1][memberName] = kill/death;
    });
    result.splice(0, 8);
    return result;
  }
}
