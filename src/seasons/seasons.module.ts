import { HttpModule, Module } from '@nestjs/common';
import { SeasonsController } from './seasons.controller';
import { SeasonsService } from './seasons.service';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
      timeout: 1000,
      httpsAgent: new https.Agent({ keepAlive: true }),
    }),
  ],
  controllers: [SeasonsController],
  providers: [SeasonsService],
})
export class SeasonsModule {}
