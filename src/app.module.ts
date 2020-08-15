import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SeasonsModule } from './seasons/seasons.module';
import { AppService} from './app.service';
import * as https from 'https';

@Module({
  imports: [
    SeasonsModule,
    HttpModule.register({
      httpsAgent: new https.Agent({keepAlive: true})
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
