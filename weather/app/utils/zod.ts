import { z } from 'zod';

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD이어야 합니다.');

const regionalSchema = z.object({
  id: z.number(),
  code: z.string(),
  name: z.string(),
  lat: z.number(),
  lon: z.number(),
  guData: z.string()
});

export const querySchema = z.object({
  startDate: dateSchema,
  endDate: dateSchema,
  locationId: regionalSchema.nullable()
});

// 필요한건지 잘모르겠네 에러가 필요한건 아니라서.. 
export const querySchemaNull = z.object({
  startDate: z.string({
    required_error: 'startDate는 반드시 필요합니다.',
    invalid_type_error: 'startDate는 문자열이어야 합니다.',
  }).nonempty('startDate는 빈 문자열일 수 없습니다.'),

  endDate: z.string({
    required_error: 'endDate는 반드시 필요합니다.',
    invalid_type_error: 'endDate는 문자열이어야 합니다.',
  }).nonempty('endDate는 빈 문자열일 수 없습니다.'),

  locationId: z.number({
    required_error: 'locationId는 반드시 필요합니다.',
    invalid_type_error: 'locationId는 숫자여야 합니다.',
  }),
});