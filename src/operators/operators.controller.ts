import { Controller, Get, Param, Render } from '@nestjs/common';
import { OperatorsService } from './operators.service';

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  @Render('operators.hbs')
  async allOperator(): Promise<any> {
    return this.operatorsService.getAllOperator();
  }

  @Get(':operator')
  @Render('operators-operator.hbs')
  async operator(@Param('operator') operatorName: string): Promise<any> {
    return this.operatorsService.getOperator(operatorName);
  }

  @Get('seasonal/:operator')
  @Render('operators-operator.hbs')
  async seasonalOperator(@Param('operator') operatorName: string): Promise<any> {
    return this.operatorsService.getSeasonalOperator(operatorName);
  }
}
