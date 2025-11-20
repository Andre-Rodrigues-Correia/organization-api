import swaggerJsdoc from 'swagger-jsdoc';
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import {
  createOrganizationSchema,
  createOrganizationWithEmployeeSchema,
} from '@/modules/organizations/organizations.validator';
import path from 'path';
import { createEmployeeSchema } from '@/modules/employees/employees.validator';
import { paginationQuerySchema } from '@/common/validator/paginated.validator';
const registry = new OpenAPIRegistry();

registry.register('Organization', createOrganizationSchema);
registry.register('Employee', createEmployeeSchema);
registry.register('PaginatedParams', paginationQuerySchema);
registry.register(
  'CreateOrganizationWithEmployee',
  createOrganizationWithEmployeeSchema,
);

const generator = new OpenApiGeneratorV3(registry.definitions);
const openApiComponents = generator.generateComponents();

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Empresas e Funcionários',
      version: '1.0.0',
    },
    components: openApiComponents.components,
  },
  apis: [path.resolve(__dirname, '../modules/**/*.routes.ts')],
});
