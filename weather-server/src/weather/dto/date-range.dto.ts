import { IsString, Matches } from 'class-validator';
import { LocationIdDto } from './location-id.dto';

export class DateRangeDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'startDate must be in the format yyyy-MM-dd HH:mm:ss' })
  startDate: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'endDate must be in the format yyyy-MM-dd HH:mm:ss' })
  endDate: string;
}

export class DateRangeDtoWithLocationId extends LocationIdDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'startDate must be in the format yyyy-MM-dd HH:mm:ss' })
  startDate: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, { message: 'endDate must be in the format yyyy-MM-dd HH:mm:ss' })
  endDate: string;
}