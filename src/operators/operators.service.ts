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
    const membersOperator = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kills = stats.getKillsByOperator(operatorName);
      const deaths = stats.getDeathsByOperator(operatorName);
      const kd = kills === 0 ? 0 : deaths === 0 ? Infinity : kills / deaths;
      const wins = stats.getWinsByOperator(operatorName);
      const losses = stats.getLossesByOperator(operatorName);
      const wl = wins === 0 ? 0 : losses === 0 ? Infinity : wins / losses;
      return { [memberName]: `[{ x: ${kd}, y: ${wl} }]` };
    });
    return Object.assign({}, ...membersOperator);
  }

  async getSeasonalOperator(operatorName: string) {
    const membersOperator = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const kills = stats.getSeasonalKillsByOperator(operatorName);
      const deaths = stats.getSeasonalDeathsByOperator(operatorName);
      const kd = kills === 0 ? 0 : deaths === 0 ? Infinity : kills / deaths;
      const wins = stats.getSeasonalWinsByOperator(operatorName);
      const losses = stats.getSeasonalLossesByOperator(operatorName);
      const wl = wins === 0 ? 0 : losses === 0 ? Infinity : wins / losses;
      return { [memberName]: `[{ x: ${kd}, y: ${wl} }]` };
    });
    return Object.assign({}, ...membersOperator);
  }

  async getAllOperator() {
    const opes = [
      'Smoke',
      'Mute',
      'Sledge',
      'Thatcher',
      'Castle',
      'Ash',
      'Pulse',
      'Thermite',
      'Doc',
      'Rook',
      'Twitch',
      'Montagne',
      'Glaz',
      'Fuze',
      'Kapkan',
      'Tachanka',
      'Blitz',
      'Iq',
      'Jager',
      'Bandit',
      'Buck',
      'Frost',
      'Blackbeard',
      'Valkyrie',
      'Capitao',
      'Hibana',
      'Echo',
      'Jackal',
      'Mira',
      'Ying',
      'Lesion',
      'Ela',
      'Zofia',
      'Dokkaebi',
      'Vigil',
      'Lion',
      'Finka',
      'Maestro',
      'Alibi',
      'Maverick',
      'Clash',
      'Nomad',
      'Kaid',
      'Mozzie',
      'Gridlock',
      'Nakk',
      'Warden',
      'Goyo',
      'Amaru',
      'Kali',
      'Wamai',
      'Oryx',
      'Iana',
      'Caveira',
    ];
    const membersOperator = members.map(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      const dataset = opes.map(operatorName => {
        const kills = stats.getKillsByOperator(operatorName);
        const deaths = stats.getDeathsByOperator(operatorName);
        const kd = kills === 0 ? 0 : deaths === 0 ? Infinity : kills / deaths;
        const wins = stats.getWinsByOperator(operatorName);
        const losses = stats.getLossesByOperator(operatorName);
        const wl = wins === 0 ? 0 : losses === 0 ? Infinity : wins / losses;
        return { x: kd, y: wl };
      });
      return { [memberName]: JSON.stringify(dataset) };
    });
    return Object.assign({}, ...membersOperator);
  }
}
