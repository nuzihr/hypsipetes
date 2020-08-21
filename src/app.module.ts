import { HttpModule, Module } from '@nestjs/common';
import { SeasonsModule } from './seasons/seasons.module';
import { OperatorsModule } from './operators/operators.module';
import { WeaponsModule } from './weapons/weapons.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as https from 'https';

@Module({
  imports: [
    SeasonsModule,
    OperatorsModule,
    WeaponsModule,
    HttpModule.register({
      httpsAgent: new https.Agent({ keepAlive: true }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
