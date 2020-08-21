import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/operators')
  async operator(): Promise<any> {
    return this.membersService.getOperators();
  }
}
