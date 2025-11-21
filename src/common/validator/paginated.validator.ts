import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { EmployeeStatusEnum } from '@/modules/employees/employees.validator';

extendZodWithOpenApi(z);

export const paginationQuerySchema = z
  .object({
    page: z.coerce.number().min(1).optional().openapi({
      example: 1,
      description: 'Número da página (opcional)',
    }),

    limit: z.coerce.number().min(1).max(100).optional().openapi({
      example: 10,
      description: 'Quantidade de itens por página (opcional)',
    }),
    status: EmployeeStatusEnum.optional().openapi({
      example: 'active',
      description: 'Status do funcionário',
    }),
  })
  .openapi('PaginationQuery');
