import { IsOptional, IsString, IsNumber, IsDecimal } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDecimal()
  lat?: number;

  @IsOptional()
  @IsDecimal()
  lon?: number;

  @IsOptional()
  @IsNumber()
  guDataId?: number;
}
