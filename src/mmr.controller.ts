import { Controller, Get, Render } from '@nestjs/common';
import { MmrService } from './mmr.service';

@Controller('mmr')
export class MmrController {
  constructor(private readonly mmrService: MmrService) {}

  @Get()
  @Render('index.hbs')
  async getMmr(): Promise<any> {
    const mmr = await this.mmrService.getMmr();
    console.log(mmr);
    return mmr;
  }
}
