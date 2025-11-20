import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export type CreateEmployeeDTO = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeDTO = z.infer<typeof updateEmployeeSchema>;

export const createEmployeeSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .openapi({ example: 'Jhon Doe', description: 'Nome do funcionário' }),

    email: z
      .string()
      .min(1)
      .email()
      .openapi({ example: 'contato@seguro.com.br', description: 'Email' }),

    position: z
      .string()
      .min(1)
      .openapi({ example: 'Analista', description: 'Cargo do funcionário' }),

    password: z
      .string()
      .min(8)
      .max(128)
      .openapi({ example: 'Abcd1234', description: 'Senha do funcionário' }),

    organization: z.string().min(1).openapi({
      example: '691f17afca372b06ced95d15',
      description: 'ID da Empresa',
    }),
  })
  .openapi('Employee');

export const updateEmployeeSchema = createEmployeeSchema.partial();
