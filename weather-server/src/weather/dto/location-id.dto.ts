import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class LocationIdDto {
  @IsInt()
  @Type(() => Number)
  locationId: number;
}
