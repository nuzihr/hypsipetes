import { Stats } from './stats.entity';

export class StatsRepository {
  private static instance: StatsRepository;
  static getInstance() {
    if (!StatsRepository.instance) {
      StatsRepository.instance = new StatsRepository();
    }
    return StatsRepository.instance;
  }

  table: Map<string, typeof Stats>;
  private constructor() {
    this.table = new Map<string, typeof Stats>()
  }

  findByName(name: string) {
    return this.table[name];
  }

  createAndSave(name, stats, ranked, operator, seasons, op_main, aliases) {
    this.table[name] = new Stats(name, stats, ranked, operator, seasons, op_main, aliases);
  }
}
