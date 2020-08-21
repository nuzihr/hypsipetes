import { HttpService, Injectable, OnModuleInit } from '@nestjs/common';
import * as pRetry from 'p-retry';
import * as pTimeout from 'p-timeout';
import { StatsRepository } from './stats.repository';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

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
  statsRepository;
  client;
  token;

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
    this.statsRepository = StatsRepository.getInstance();
    this.client = new SecretManagerServiceClient();
  }

  async accessSecret(): Promise<any> {
    const name = 'projects/nuzihr-286314/secrets/r6stats/versions/latest';
    const [version] = await this.client.accessSecretVersion({
      name: name,
    });
    // Extract the payload as a string.
    return version.payload.data.toString();
  }

  async onModuleInit(): Promise<any> {
    this.token = await this.accessSecret();
    await Promise.all(
      members.map(async memberName => {
        const generic = await this.getStatsFromApiWithRetry(
          memberName,
          'generic',
        );
        const seasonal = await this.getStatsFromApiWithRetry(
          memberName,
          'seasonal',
        );
        const operators = await this.getStatsFromApiWithRetry(
          memberName,
          'operators',
        );
        const weapons = await this.getStatsFromApiWithRetry(
          memberName,
          'weapons',
        );
        // const weaponsCategories = await this.getStatsFromApiWithRetry(memberName, "weapons-categories");
        await this.statsRepository.createAndSave(
          memberName,
          generic,
          seasonal,
          operators,
          weapons,
        );
        return;
      }),
    );
    console.log(`The App module has been initialized.`);
  }

  private async getStatsFromApiWithRetry(
    username: string,
    type: string,
  ): Promise<any> {
    const url = `https://api2.r6stats.com/public-api/stats/${username}/psn/${type}`;
    return await pRetry(
      async () => {
        const result = await pTimeout(
          this.httpService
            .get(url, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .toPromise(),
          1000,
          'http request timeout',
        );
        if (!result.data) return null;
        return result.data;
      },
      {
        retries: 4,
        onFailedAttempt: error => {
          console.log(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
          );
        },
      },
    );
  }
}
