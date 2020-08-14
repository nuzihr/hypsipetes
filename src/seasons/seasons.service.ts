import { HttpService, Injectable } from '@nestjs/common';
import * as pRetry from 'p-retry'
import * as pTimeout from 'p-timeout'

const members = [
  'Im_yoncharu823',
  'Im_akiiiiisutani',
  'Da-reyorimotakak',
  'Im_Denchan',
  'Imanimite_iro',
  'Awappu1226',
  'Im_Kopanosuke',
  'awajima620',
  'tiger-mam',
  'Im_Mechimpo',
] as const;
type member = typeof members[number];
type score = {
  [key in member]: string;
};
type allStats = {
  status: any;
  found: any;
  player: any;
  custom: any;
  refresh: any;
  aliases: any;
  stats: any;
  ranked: any;
  social: any;
  operators: any;
  overlay: any;
  history: any;
  seasons: { [x: string]: seasonStats };
  op_main: any;
};
type seasonStats = {
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
};

const ids: { [x in member]: string } = {
  Awappu1226: 'ade8a216-1f66-4e0a-b289-7201959565af',
  Imanimite_iro: '6764136f-e65e-4421-81e9-a874895ce77c',
  Im_Denchan: '415a3e39-1ab7-4099-ac8d-77dd8deb3dd0',
  Im_yoncharu823: '88b56176-f508-4eb4-84b7-0f290a800b91',
  Im_akiiiiisutani: 'c1b0882d-1b5d-47a4-afb8-1b3604a89a76',
  'Da-reyorimotakak': '598bd73f-4eeb-4ccc-8305-d39ea1da38be',
  Im_Kopanosuke: '84dae58c-6cf8-458f-a4f9-b8cd7741b46d',
  awajima620: 'f6b64f22-473a-48dd-bfad-87d846a778e1',
  'tiger-mam': '3f322ad9-d59d-4043-a134-fde9c63f2130',
  Im_Mechimpo: '82757c1c-834a-4d23-b1ab-51f8aa8f18e5',
};

@Injectable()
export class SeasonsService {
  constructor(private httpService: HttpService) {
    this.httpService = httpService
  }

  private async getStatsFromApiWithRetry(userId: string): Promise<any> {
    const url = `https://r6.apitab.com/player/${userId}`;
    const stats = await pRetry(async () => {
      const result = await pTimeout(this.httpService.get(url).toPromise(), 1000, 'http request timeout')
      if (!result.data) return null;
      return result.data
    }, {
      retries: 4,
      onFailedAttempt: error => {
        console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`);
      }
    });
    return stats
  }


  async getMmr(): Promise<score> {
    const point = await Promise.all(
      members.map(async memberName => {
        const userId = ids[memberName];
        const stats = await this.getStatsFromApiWithRetry(userId)
        if (!stats) return;
        const mmrs = this.getMmrBySeasons(stats);
        return { [memberName]: mmrs.toString() };
      }),
    );
    const result = Object.assign({}, ...point);
    return result;
  }

  private getMmrBySeasons(stats: allStats): number[] {
    const result = Object.entries<seasonStats>(stats.seasons).map(([key, value]) => {
      const mmr: number = value['AS_mmr'];
      if (mmr === 0) {
        return NaN;
      }
      return mmr;
    });

    const now = stats.ranked['mmr'];
    if (now === 0) result.push(NaN);
    else result.push(now);

    return result;
  }
}
