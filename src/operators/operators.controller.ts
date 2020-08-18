import { Controller, Get, Param, Render } from '@nestjs/common';
import { OperatorsService } from './operators.service';

@Controller('api/operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get(':operator')
  async operator(@Param('operator') operatorName: string): Promise<any> {
    return this.operatorsService.getOperator(operatorName);
  }

  @Get('seasonal/:operator')
  async seasonalOperator(@Param('operator') operatorName: string): Promise<any> {
    return this.operatorsService.getSeasonalOperator(operatorName);
  }
}
