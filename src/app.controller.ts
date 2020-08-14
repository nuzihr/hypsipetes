import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index.hbs')
  async root(): Promise<any> {
    return {};
  }
}
