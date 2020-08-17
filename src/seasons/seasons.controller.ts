import { Controller, Get, Render } from '@nestjs/common';
import { SeasonsService } from './seasons.service';

@Controller('api/seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Get('mmr')
  async mmr(): Promise<any> {
    return this.seasonsService.getMmr();
  }

  @Get('killRatio')
  async killRatio(): Promise<any> {
    return this.seasonsService.getKillRatio();
  }
}
