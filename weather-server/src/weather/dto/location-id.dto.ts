import { IsArray, IsInt, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class LocationIdsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  locationIds: number[];
}
