import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SeasonsModule } from './seasons/seasons.module';

@Module({
  imports: [SeasonsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
