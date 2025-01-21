import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class LocationIdsDto {
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  locationIds: number[];
}
