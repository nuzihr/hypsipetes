interface SeasonsStats {
  NA_mmr: number;
  NA_champ: number;
  NA_wins: number;
  NA_losses: number;
  NA_abandons: number;
  NA_kills: number;
  NA_deaths: number;
  EU_mmr: number;
  EU_champ: number;
  EU_wins: number;
  EU_losses: number;
  EU_abandons: number;
  EU_kills: number;
  EU_deaths: number;
  AS_mmr: number;
  AS_champ: number;
  AS_wins: number;
  AS_losses: number;
  AS_abandons: number;
  AS_kills: number;
  AS_deaths: number;
  seasonname: string;
  seasonclass: string;
  champ: string;
  maxmmr: number;
  maxrank: number;
  maxrankname: string;
}
interface OperatorsStats {
  id: string;
  type: string;
  overall: {
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
    timeplayed: number;
    kd: string;
    winrate: number;
  };
  seasonal: {
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
    timeplayed: number;
    kd: string;
    winrate: number;
  };
}

export class Stats {
  private readonly _name: string;
  private readonly _stats: {
    level: number;
    casualpvp_kills: number;
    casualpvp_death: number;
    casualpvp_matchwon: number;
    casualpvp_matchlost: number;
    casualpvp_timeplayed: number;
    casualpvp_hoursplayed: number;
    casualpvp_matches: number;
    casualpvp_kd: string;
    casualpvp_wl: string;
    rankedpvp_kills: number;
    rankedpvp_death: number;
    rankedpvp_matchwon: number;
    rankedpvp_matchlost: number;
    rankedpvp_timeplayed: number;
    rankedpvp_hoursplayed: number;
    rankedpvp_matches: number;
    rankedpvp_kd: string;
    rankedpvp_wl: string;
    rankedpvp_roundwl: string;
    generalpvp_headshot: number;
    generalpvp_kills: number;
    generalpvp_timeplayed: number;
    generalpve_kills: number;
    generalpve_death: number;
    generalpve_matchwon: number;
    generalpve_matchlost: number;
    generalpve_headshot: number;
    generalpve_timeplayed: number;
    generalpvp_hoursplayed: number;
    generalpvp_death: number;
    generalpvp_kd: string;
    generalpvp_matchwon: number;
    generalpvp_matchlost: number;
    generalpvp_matches: number;
    generalpvp_wl: string;
    generalpvp_hsrate: string;
    generalpvp_killassists: number;
    generalpvp_meleekills: number;
    generalpvp_revive: number;
    generalpvp_penetrationkills: number;
    generalpve_hoursplayed: number;
    generalpve_matches: number;
    generalpve_kd: string;
    generalpve_wl: string;
    generalpve_hsrate: string;
    plantbombpvp_matchwon: number;
    plantbombpvp_matchlost: number;
    secureareapvp_matchwon: number;
    secureareapvp_matchlost: number;
    rescuehostagepvp_matchwon: number;
    rescuehostagepvp_matchlost: number;
    plantbombpvp_matches: number;
    plantbombpvp_wl: string;
    secureareapvp_matches: number;
    secureareapvp_wl: string;
    rescuehostagepvp_matches: number;
    rescuehostagepvp_wl: string;
    tabmmr: number;
    tabrank: number;
    tabrankname: string;
  };
  private readonly _ranked: {
    AS_kills: number;
    AS_deaths: number;
    AS_wins: number;
    AS_losses: number;
    AS_abandons: number;
    AS_mmr: number;
    AS_maxmmr: number;
    AS_champ: number;
    AS_mmrchange: number;
    AS_actualmmr: number;
    AS_matches: number;
    AS_wl: string;
    AS_kd: string;
    AS_intkd: number;
    AS_rank: number;
    AS_rankname: string;
    AS_maxrank: number;
    AS_maxrankname: string;
    AS_killpermatch: number;
    AS_deathspermatch: number;
    allkills: number;
    alldeaths: number;
    allwins: number;
    alllosses: number;
    allabandons: number;
    EU_kills: number;
    EU_deaths: number;
    EU_wins: number;
    EU_losses: number;
    EU_abandons: number;
    EU_mmr: number;
    EU_maxmmr: number;
    EU_champ: number;
    EU_mmrchange: number;
    EU_actualmmr: number;
    EU_matches: number;
    EU_wl: string;
    EU_kd: string;
    EU_intkd: number;
    EU_rank: number;
    EU_rankname: string;
    EU_maxrank: number;
    EU_maxrankname: string;
    EU_killpermatch: number;
    EU_deathspermatch: number;
    NA_kills: number;
    NA_deaths: number;
    NA_wins: number;
    NA_losses: number;
    NA_abandons: number;
    NA_mmr: number;
    NA_maxmmr: number;
    NA_champ: number;
    NA_mmrchange: number;
    NA_actualmmr: number;
    NA_matches: number;
    NA_wl: string;
    NA_kd: string;
    NA_intkd: number;
    NA_rank: number;
    NA_rankname: string;
    NA_maxrank: number;
    NA_maxrankname: string;
    NA_killpermatch: number;
    NA_deathspermatch: number;
    mmr: number;
    maxmmr: number;
    kd: number;
    rank: number;
    rankname: string;
    maxrank: number;
    maxrankname: string;
    champ: number;
    topregion: string;
    actualmmr: number;
    best_mmrchange: number;
    best_wins: number;
    best_losses: number;
    best_matches: number;
    best_kd: string;
    best_intkd: number;
    best_wl: string;
    allmatches: number;
    allkd: string;
    allintkd: number;
    allwl: string;
    killpermatch: number;
    deathspermatch: number;
  };
  private readonly _operators: {
    [operator: string]: OperatorsStats;
  };
  private readonly _seasons: { [index: string]: SeasonsStats };
  private readonly _op_main: { attacker: string; defender: string };
  private readonly _aliases: {
    [index: string]: { name: string; utime: number; date: string };
  };

  constructor(name, stats, ranked, operators, seasons, op_main, aliases) {
    this._name = name;
    this._stats = stats;
    this._ranked = ranked;
    this._operators = operators;
    this._seasons = seasons;
    this._op_main = op_main;
    this._aliases = aliases;
  }

  get name(): string {
    return this._name;
  }

  get seasons() {
    return this._seasons;
  }

  get stats() {
    return this._stats;
  }

  get ranked() {
    return this._ranked;
  }

  get operators() {
    return this._operators;
  }

  get op_main() {
    return this._op_main;
  }

  get aliases() {
    return this._aliases;
  }

  getMmrsBySeasons(): number[] {
    return Object.entries(this.seasons).map(([key, value]) => value['AS_mmr']);
  }

  getKillsBySeasons(): number[] {
    return Object.entries(this.seasons).map(
      ([key, value]) => value['AS_kills'],
    );
  }

  getDeathsBySeasons(): number[] {
    return Object.entries(this.seasons).map(
      ([key, value]) => value['AS_deaths'],
    );
  }

  getKillsByOperator(operatorName: string): number {
    return this.operators[operatorName].overall.kills;
  }

  getDeathsByOperator(operatorName: string): number {
    return this.operators[operatorName].overall.deaths;
  }

  getWinsByOperator(operatorName: string): number {
    return this.operators[operatorName].overall.wins;
  }

  getLossesByOperator(operatorName: string): number {
    return this.operators[operatorName].overall.losses;
  }

  getPlayedMinutesByOperator(operatorName: string): number {
    return this.operators[operatorName].overall.timeplayed / 60;
  }

  getSeasonalKillsByOperator(operatorName: string): number {
    return this.operators[operatorName].seasonal.kills;
  }

  getSeasonalDeathsByOperator(operatorName: string): number {
    return this.operators[operatorName].seasonal.deaths;
  }

  getSeasonalWinsByOperator(operatorName: string): number {
    return this.operators[operatorName].seasonal.wins;
  }

  getSeasonalLossesByOperator(operatorName: string): number {
    return this.operators[operatorName].seasonal.losses;
  }

  getSeasonalPlayedMinutesByOperator(operatorName: string): number {
    return this.operators[operatorName].seasonal.timeplayed / 60;
  }
}
