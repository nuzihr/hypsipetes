import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MmrController } from './mmr.controller';
import { MmrService } from './mmr.service';

@Module({
  imports: [],
  controllers: [AppController, MmrController],
  providers: [AppService, MmrService],
})
export class AppModule {}
