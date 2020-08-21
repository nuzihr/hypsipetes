import { Controller, Get, Param, Render } from '@nestjs/common';
import { WeaponsService } from './weapons.service';

@Controller('api/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get(':weapon')
  async operator(@Param('weapon') weaponName: string): Promise<any> {
    return this.weaponsService.getWeapon(weaponName);
  }
}
