import { Type } from 'class-transformer';
import { IsArray, IsInt, ArrayNotEmpty, ArrayMinSize, ValidateNested } from 'class-validator';

export class LocationIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  locationIds: number[];
}
