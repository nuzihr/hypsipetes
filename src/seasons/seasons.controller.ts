import { Controller, Get, Render } from '@nestjs/common';
import { SeasonsService } from './seasons.service';

@Controller('mmr')
export class SeasonsController {
  constructor(private readonly mmrService: SeasonsService) {}

  @Get()
  @Render('seasons-mmr.hbs')
  async getMmr(): Promise<any> {
    const mmr = await this.mmrService.getMmr();
    console.log(mmr);
    return mmr;
  }
}
