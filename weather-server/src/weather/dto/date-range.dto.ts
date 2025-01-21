import { IsString, Matches } from 'class-validator';
import { LocationIdsDto } from './location-id.dto';

export class DateRangeDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}$/, { message: 'startDate must be in the format yyyy-MM-dd HH' })
  startDate: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}$/, { message: 'endDate must be in the format yyyy-MM-dd HH' })
  endDate: string;
}

export class DateRangeDtoWithLocationIds extends LocationIdsDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}$/, { message: 'startDate must be in the format yyyy-MM-dd HH' })
  startDate: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}$/, { message: 'endDate must be in the format yyyy-MM-dd HH' })
  endDate: string;
}