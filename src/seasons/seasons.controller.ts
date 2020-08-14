import { Controller, Get, Render } from '@nestjs/common';
import { SeasonsService } from './seasons.service';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly mmrService: SeasonsService) {

  }

  @Get()
  @Render('index.hbs')
  async seasons(): Promise<any> {
    return {};
  }

  @Get('mmr')
  @Render('seasons-mmr.hbs')
  async mmr(): Promise<any> {
    return this.mmrService.getMmr();
  }

  @Get('killRatio')
  @Render('seasons-killRatio.hbs')
  async killRatio(): Promise<any> {
    return this.mmrService.getKillRatio();
  }
}
