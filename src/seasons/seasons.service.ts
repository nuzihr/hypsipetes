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
    const result = [
      { name: 'health' },
      { name: 'blood_orchid' },
      { name: 'white_noise' },
      { name: 'chimera' },
      { name: 'para_bellum' },
      { name: 'grim_sky' },
      { name: 'wind_bastion' },
      { name: 'burnt_horizon' },
      { name: 'phantom_sight' },
      { name: 'ember_rise' },
      { name: 'shifting_tides' },
      { name: 'void_edge' },
      { name: 'steel_wave' },
    ];
    members.forEach(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const mmrs = stats.getMmrsBySeasons();
      result.forEach(obj => {
        const season = obj.name;
        obj[memberName] = mmrs[season];
      });
    });
    return result;
  }

  async getKillRatio() {
    const result = [
      { name: 'health' },
      { name: 'blood_orchid' },
      { name: 'white_noise' },
      { name: 'chimera' },
      { name: 'para_bellum' },
      { name: 'grim_sky' },
      { name: 'wind_bastion' },
      { name: 'burnt_horizon' },
      { name: 'phantom_sight' },
      { name: 'ember_rise' },
      { name: 'shifting_tides' },
      { name: 'void_edge' },
      { name: 'steel_wave' },
    ];
    members.forEach(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kills = stats.getKillsBySeasons();
      const deaths = stats.getDeathsBySeasons();
      result.forEach(obj => {
        const season = obj.name;
        const kill = kills[season];
        const death = deaths[season];
        if (kill !== 0 && death !== 0) obj[memberName] = kill / death;
      });
    });
    result.splice(0, 8);
    return result;
  }
}
