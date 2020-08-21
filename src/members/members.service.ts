import { Injectable } from '@nestjs/common';
import { members } from '../app.service';
import { StatsRepository } from '../stats.repository';
import { Stats } from '../stats.entity';

@Injectable()
export class MembersService {
  statsRepository;
  operators;
  constructor() {
    this.statsRepository = StatsRepository.getInstance();
    this.operators = {
      attacker: {
        '3': ["Ash","IQ","Capitão","Hibana","Maverick"],
        '2': ["Sledge","Thatcher","Thermite","Twitch","Blitz","Glaz","Buck","Blackbeard","Jackal",
        "Ying","Zofia","Dokkaebi","Lion","Finka","Nomad","Nøkk","Amaru","Kali","Iana","Ace"
        ],
        '1': ["Montagne","Fuze","Gridlock"],
      },
      defender: {
        '3': ["Pulse","Bandit","Caveira","Ela","Vigil","Alibi"],
        '2': ["Mute","Smoke","Castle","Jäger","Kapkan","Frost","Valkyrie","Lesion","Mozzie","Warden","Goyo","Wamai","Oryx","Melusi"],
        '1': ["Doc","Rook","Tachanka","Echo","Mira","Maestro","Clash","Kaid"],
      }
    }
  }

  async getOperators() {
    const result = [
      { name: 'Attacker Speed2' },
      { name: 'Attacker Speed1' },
      { name: 'Defender Speed1' },
      { name: 'Defender Speed2' },
      { name: 'Defender Speed3' },
      { name: 'Attacker Speed3' },
    ];
     members.forEach(memberName => {
      const stats: Stats = this.statsRepository.findByName(memberName);
      result[0][memberName]=this.getKdAverage(this.operators["attacker"]["2"], stats);
      result[1][memberName]=this.getKdAverage(this.operators["attacker"]["1"], stats);
      result[2][memberName]=this.getKdAverage(this.operators["defender"]["1"], stats);
      result[3][memberName]=this.getKdAverage(this.operators["defender"]["2"], stats);
      result[4][memberName]=this.getKdAverage(this.operators["defender"]["3"], stats);
      result[5][memberName]=this.getKdAverage(this.operators["attacker"]["3"], stats);
    });
    return result;
  }

  getKdAverage(operators: string[], stats: Stats) {
      let result = 0;
      operators.map((operator) => stats.getKdByOperator(operator)).forEach((kd)=>result+=kd);
      return result/operators.length;
  }
}
