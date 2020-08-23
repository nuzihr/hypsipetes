import { Injectable } from '@nestjs/common';
import { members } from '../app.service';
import { StatsRepository } from '../stats.repository';
import { Stats } from '../stats.entity';

@Injectable()
export class OperatorsService {
  statsRepository;
  constructor() {
    this.statsRepository = StatsRepository.getInstance();
  }

  async getOperator(operatorName: string) {
    if (operatorName === 'Nokk') operatorName = 'Nøkk';
    if (operatorName === 'Capitao') operatorName = 'Capitão';
    if (operatorName === 'Jager') operatorName = 'Jäger';
    const membersOperator = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kd = stats.getKdByOperator(operatorName);
      const wl = stats.getWlByOperator(operatorName);
      const playedMinutes = stats.getPlayedMinutesByOperator(operatorName);
      return { [memberName]: { x: kd, y: wl, z: playedMinutes } };
    });
    return Object.assign({}, ...membersOperator);
  }
}
