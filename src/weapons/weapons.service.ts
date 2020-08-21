import { Injectable } from '@nestjs/common';
import { members } from '../app.service';
import { StatsRepository } from '../stats.repository';
import { Stats } from '../stats.entity';

@Injectable()
export class WeaponsService {
  statsRepository;
  constructor() {
    this.statsRepository = StatsRepository.getInstance();
  }

  async getWeapon(name: string) {
    const weaponName = name.replace(/(_)/g, ' ');
    const membersOperator = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kd = stats.getKdByWeapon(weaponName);
      const headshot = stats.getHeadShotPercentageByWeapon(weaponName);
      const playedTimes = stats.getPlayedTimesByWeapon(weaponName);
      return { [memberName]: { x: kd, y: headshot, z: playedTimes } };
    });
    return Object.assign({}, ...membersOperator);
  }
}
