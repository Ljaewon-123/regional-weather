import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class LimitDto{
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit: number
}