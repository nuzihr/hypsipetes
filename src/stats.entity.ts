export class Stats {
  private readonly _name: string;
  private readonly _generic: {
    general: {
      assists: number;
      barricades_deployed: number;
      blind_kills: number;
      bullets_fired: number;
      bullets_hit: number;
      dbnos: number;
      deaths: number;
      distance_travelled: number;
      draws: number;
      gadgets_destroyed: number;
      games_played: number;
      headshots: number;
      kd: number;
      kills: number;
      losses: number;
      melee_kills: number;
      penetration_kills: number;
      playtime: number;
      rappel_breaches: number;
      reinforcements_deployed: number;
      revives: number;
      suicides: number;
      wins: number;
      wl: number;
    };
    queue: {
      casual: {
        deaths: number;
        draws: number;
        games_played: number;
        kd: number;
        kills: number;
        losses: number;
        playtime: number;
        wins: number;
        wl: number;
      };
      ranked: {
        deaths: number;
        draws: number;
        games_played: number;
        kd: number;
        kills: number;
        losses: number;
        playtime: number;
        wins: number;
        wl: number;
      };
      other: {
        deaths: number;
        draws: number;
        games_played: number;
        kd: number;
        kills: number;
        losses: number;
        playtime: number;
        wins: number;
        wl: number;
      };
    };
    gamemode: {
      bomb: {
        best_score: number;
        games_played: number;
        losses: number;
        playtime: number;
        wins: number;
        wl: number;
      };
      secure_area: {
        best_score: number;
        games_played: number;
        kills_as_attacker_in_objective: number;
        kills_as_defender_in_objective: number;
        losses: number;
        playtime: number;
        times_objective_secured: number;
        wins: number;
        wl: number;
      };
      hostage: {
        best_score: number;
        games_played: number;
        losses: number;
        playtime: number;
        extractions_denied: number;
        wins: number;
        wl: number;
      };
    };
  };
  private readonly _seasonal: {
    [season: string]: {
      name: string;
      start_date: string;
      end_date: string;
      resions: {
        [resion: string]: {
          season_id: number;
          region: string;
          abandons: number;
          losses: number;
          max_mmr: number;
          max_rank: number;
          mmr: number;
          next_tank_mmr: number;
          prev_rank_mmr: number;
          rank: number;
          skill_mean: number;
          skill_standard_devitation: number;
          created_for_date: string;
          wins: number;
          kills: number;
          deaths: number;
          last_match_mmr_change: number;
          last_match_skill_mean_change: string;
          last_match_skill_standard_deviation_change: string;
          last_match_result: number;
          champions_rank_position: number;
          rank_text: string;
          rank_image: string;
          max_rank_text: string;
          max_rank_image: string;
        }[];
      };
    };
  };
  private readonly _operators: {
    name: string;
    ctu: string;
    role: string;
    kills: number;
    deaths: number;
    kd: number;
    wins: number;
    losses: number;
    wl: number;
    headshots: number;
    dbnos: number;
    melee_kills: number;
    experience: number;
    playtime: number;
    abilities: {
      ability: string;
      value: number;
    }[];
    badge_image: string;
  }[];
  private readonly _weapons: {
    weapon: string;
    category: string;
    kills: number;
    deaths: number;
    kd: number;
    headshots: number;
    headshot_percentage: number;
    times_chosen: number;
    bullets_fired: number;
    bullets_hit: number;
    created: string;
    last_updated: string;
  }[];
  // private readonly _weaponCategories;

  constructor(name, generic, seasonal, operators, weapons) {
    this._name = name;
    this._generic = generic;
    this._seasonal = seasonal;
    this._operators = operators;
    this._weapons = weapons;
  }

  get name(): string {
    return this._name;
  }

  get generic() {
    return this._generic;
  }

  get seasonal() {
    return this._seasonal;
  }

  get operators() {
    return this._operators;
  }

  get weapons() {
    return this._weapons;
  }

  getMmrsBySeasons(): number[] {
    return Object.entries(this.seasonal).map(
      ([season, ranked]) => ranked.resions.apac[0].mmr,
    );
  }

  getKillsBySeasons(): number[] {
    return Object.entries(this.seasonal).map(
      ([season, ranked]) => ranked.resions.apac[0].kills,
    );
  }

  getDeathsBySeasons(): number[] {
    return Object.entries(this.seasonal).map(
      ([season, ranked]) => ranked.resions.apac[0].deaths,
    );
  }

  getKillsByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.kills;
  }

  getDeathsByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.deaths;
  }

  getKdByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.kd;
  }

  getWinsByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.wins;
  }

  getLossesByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.losses;
  }

  getWlByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.wl;
  }

  getPlayedMinutesByOperator(operatorName: string): number {
    const operatorScore = this.operators.filter(
      operator => operator.name === operatorName,
    )[0];
    return operatorScore.playtime / 60;
  }
}
