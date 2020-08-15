import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import * as pRetry from 'p-retry';
import * as pTimeout from 'p-timeout';
import { StatsRepository } from './stats.repository';

export const members = [
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
export type member = typeof members[number];

@Injectable()
export class AppService implements OnModuleInit {
  idData: { [key in member]: string };
  statsRepository;

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
    this.idData = {
      'Da-reyorimotakak': '598bd73f-4eeb-4ccc-8305-d39ea1da38be',
      Im_yoncharu823: '88b56176-f508-4eb4-84b7-0f290a800b91',
      Im_Denchan: '415a3e39-1ab7-4099-ac8d-77dd8deb3dd0',
      'tiger-mam': '3f322ad9-d59d-4043-a134-fde9c63f2130',
      Awappu1226: 'ade8a216-1f66-4e0a-b289-7201959565af',
      Imanimite_iro: '6764136f-e65e-4421-81e9-a874895ce77c',
      Im_akiiiiisutani: 'c1b0882d-1b5d-47a4-afb8-1b3604a89a76',
      Im_Kopanosuke: '84dae58c-6cf8-458f-a4f9-b8cd7741b46d',
      Im_Mechimpo: '82757c1c-834a-4d23-b1ab-51f8aa8f18e5',
      awajima620: 'f6b64f22-473a-48dd-bfad-87d846a778e1',
    };
    this.statsRepository = StatsRepository.getInstance();
  }

  async onModuleInit(): Promise<any> {
    await Promise.all(
      members.map(async memberName => {
        const id = this.idData[memberName];
        const {
          stats,
          ranked,
          operators,
          seasons,
          op_main,
          aliases,
        } = await this.getStatsFromApiWithRetry(id);
        await this.statsRepository.createAndSave(
          memberName,
          stats,
          ranked,
          operators,
          seasons,
          op_main,
          aliases,
        );
        return;
      }),
    );
    console.log(`The App module has been initialized.`);
  }

  private async getStatsFromApiWithRetry(userId: string): Promise<any> {
    const url = `https://r6.apitab.com/player/${userId}`;
    return await pRetry(
      async () => {
        const result = await pTimeout(
          this.httpService.get(url).toPromise(),
          1000,
          'http request timeout',
        );
        if (!result.data) return null;
        return result.data;
      },
      {
        retries: 9,
        onFailedAttempt: error => {
          console.log(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }
}
