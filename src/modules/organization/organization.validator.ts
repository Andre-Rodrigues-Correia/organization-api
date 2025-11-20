import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { cnpj } from 'cpf-cnpj-validator';

extendZodWithOpenApi(z);

export type CreateOrganizationDTO = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationDTO = z.infer<typeof updateOrganizationSchema>;

export const createOrganizationSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .openapi({ example: 'Contato Seguro', description: 'Nome da empresa' }),

    sector: z
      .string()
      .min(1)
      .openapi({ example: 'Tecnologia', description: 'Setor de atuação' }),

    cnpj: z
      .string()
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => cnpj.isValid(value), {
        message: 'CNPJ inválido',
      })
      .openapi({ example: '12345678000190', description: 'CNPJ da empresa' }),

    city: z
      .string()
      .min(1)
      .openapi({ example: 'São Paulo', description: 'Cidade da empresa' }),
  })
  .openapi('Organization');

export const updateOrganizationSchema = createOrganizationSchema.partial();
