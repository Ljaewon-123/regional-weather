import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ResponseHandler } from 'src/utils/response-handler';

@Controller('health')
export class HealthController {

  @Get()
  @HttpCode(HttpStatus.OK)
  async locationsInfo(){
    return ResponseHandler.success()
  }
}
